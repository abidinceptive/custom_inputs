/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { GOOGLE_MAPS_API_KEY } from "./MapView";

// Define the location data structure
interface LocationData {
  lat: number;
  lng: number;
  address: string;
  city: string;
  state?: string;
  country: string;
  placeId?: string;
  formattedAddress: string;
}

// Props for the EditableGoogleMap component
interface EditableGoogleMapProps {
  labelT: string;
  locationData: LocationData | null;
  onSaveLocation: (location: LocationData) => Promise<void>;
  disabled?: boolean;
  note?: string;
}

// Declare Google Maps types to avoid TypeScript errors
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const EditableGoogleMap = ({
  labelT,
  locationData,
  onSaveLocation,
  disabled,
  note,
}: EditableGoogleMapProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    locationData
  );
  const [tempLocation, setTempLocation] = useState<LocationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const geocoderRef = useRef<any>(null);

  // Initialize the map
  const initMap = useCallback(() => {
    if (!mapRef.current) return;

    const defaultLocation = locationData || { lat: 51.5074, lng: -0.1278 }; // Default to London if no location

    const mapOptions = {
      center: { lat: defaultLocation.lat, lng: defaultLocation.lng },
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);
    mapInstanceRef.current = map;

    // Create a marker for the selected location
    const marker = new window.google.maps.Marker({
      position: { lat: defaultLocation.lat, lng: defaultLocation.lng },
      map: map,
      draggable: true,
      animation: window.google.maps.Animation.DROP,
    });
    markerRef.current = marker;

    // Create a geocoder instance
    const geocoder = new window.google.maps.Geocoder();
    geocoderRef.current = geocoder;

    // Create a search box
    const input = document.getElementById("map-search-box") as HTMLInputElement;
    const searchBox = new window.google.maps.places.SearchBox(input);
    searchBoxRef.current = searchBox;

    // Bias the SearchBox results towards current map's viewport
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve more details
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length === 0) return;

      const place = places[0];
      if (!place.geometry || !place.geometry.location) return;

      // Center map on the selected place
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      // Update marker position
      marker.setPosition(place.geometry.location);

      // Extract location data
      extractLocationData(place);
    });

    // Handle marker drag events
    marker.addListener("dragend", () => {
      const position = marker.getPosition();
      geocoder.geocode({ location: position }, (results: any, status: any) => {
        if (status === "OK" && results[0]) {
          extractLocationData(results[0]);
        }
      });
    });

    // Allow clicking on the map to set the marker
    map.addListener("click", (event: any) => {
      marker.setPosition(event.latLng);
      geocoder.geocode(
        { location: event.latLng },
        (results: any, status: any) => {
          if (status === "OK" && results[0]) {
            extractLocationData(results[0]);
          }
        }
      );
    });

    setMapLoaded(true);
  }, [locationData]);

  // Function to load Google Maps API script
  const loadGoogleMapsScript = useCallback(() => {
    if (window.google?.maps) {
      initMap();
      return;
    }

    // Replace with your actual Google Maps API key
    const apiKey = GOOGLE_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [initMap]);

  // Initialize the map when the dialog opens
  useEffect(() => {
    if (isOpen && !mapLoaded) {
      loadGoogleMapsScript();
    }
  }, [isOpen, mapLoaded, loadGoogleMapsScript]);

  // Extract location data from Google Maps place or geocoding result
  const extractLocationData = (place: any) => {
    const position =
      place.geometry?.location || markerRef.current?.getPosition();

    if (!position) return;

    const lat = position.lat();
    const lng = position.lng();
    let address = "";
    let city = "";
    let state = "";
    let country = "";

    // Extract address components
    if (place.address_components) {
      for (const component of place.address_components) {
        const types = component.types;

        if (types.includes("street_number") || types.includes("route")) {
          address += component.long_name + " ";
        }

        if (types.includes("locality") || types.includes("sublocality")) {
          city = component.long_name;
        }

        if (types.includes("administrative_area_level_1")) {
          state = component.long_name;
        }

        if (types.includes("country")) {
          country = component.long_name;
        }
      }
    }

    // Create location data object
    const newLocationData: LocationData = {
      lat,
      lng,
      address: address.trim(),
      city,
      state,
      country,
      placeId: place.place_id,
      formattedAddress: place.formatted_address || "",
    };

    setTempLocation(newLocationData);
  };

  // Handle dialog close
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setTempLocation(null);
    }
    setIsOpen(open);
  };

  // Handle save location
  const handleSave = async () => {
    if (!tempLocation) return;

    try {
      setIsLoading(true);
      await onSaveLocation(tempLocation);
      setSelectedLocation(tempLocation);
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between items-center">
          <Label>{labelT}</Label>
          {!disabled && (
            <Dialog open={isOpen} onOpenChange={handleDialogClose}>
              <DialogTrigger asChild>
                <Button variant="ghost">Change</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Edit Location</DialogTitle>
                  <DialogDescription>
                    Search for a location, click on the map, or drag the marker
                    to set your location.
                  </DialogDescription>
                </DialogHeader>

                {/* Search box */}
                <div className="flex gap-2 mb-4">
                  <Input
                    id="map-search-box"
                    placeholder="Search for a location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>

                {/* Map container */}
                <div
                  ref={mapRef}
                  className="w-full h-64 rounded-md border border-gray-300 mb-4"
                />

                {/* Selected location info */}
                {tempLocation && (
                  <div className="bg-slate-50 p-3 rounded-md text-sm">
                    <p className="font-medium mb-1">Selected Location:</p>
                    <p>
                      {tempLocation.formattedAddress ||
                        `${tempLocation.address}, ${tempLocation.city}, ${tempLocation.country}`}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Lat: {tempLocation.lat.toFixed(6)}, Lng:{" "}
                      {tempLocation.lng.toFixed(6)}
                    </p>
                  </div>
                )}

                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleDialogClose(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={!tempLocation || isLoading}
                  >
                    {isLoading ? "Saving..." : "Save location"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        {!!note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>

      {/* Map preview */}
      <div className="w-full max-w-xs h-40 border rounded-sm p-2 relative">
        {selectedLocation ? (
          <>
            <div className="absolute inset-0 bg-slate-100 z-0">
              {/* This would be replaced with an actual static map if you have a Google Maps Static API key */}
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                frameBorder="0"
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${selectedLocation.lat},${selectedLocation.lng}`}
                allowFullScreen
              ></iframe>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-1 text-xs">
              {selectedLocation.formattedAddress ||
                `${selectedLocation.city}, ${selectedLocation.country}`}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No location selected
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableGoogleMap;
