import { useState, useEffect, useRef } from "react";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  useMap,
  useMapsLibrary,
  ControlPosition,
  MapControl,
  useAdvancedMarkerRef,
  MapMouseEvent,
} from "@vis.gl/react-google-maps";
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

// Components
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

  // Update selected location when locationData prop changes
  useEffect(() => {
    setSelectedLocation(locationData);
  }, [locationData]);

  // Initialize temp location when dialog opens
  useEffect(() => {
    if (isOpen) {
      setTempLocation(selectedLocation);
    }
  }, [isOpen, selectedLocation]);

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

                {/* Map with API Provider */}
                <div className="w-full h-64 rounded-md border border-gray-300 mb-4">
                  <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <MapWithControls
                      initialLocation={
                        tempLocation ||
                        locationData || { lat: 51.5074, lng: -0.1278 }
                      }
                      onLocationSelect={setTempLocation}
                    />
                  </APIProvider>
                </div>

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
              <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                <Map
                  defaultCenter={{
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                  }}
                  defaultZoom={14}
                  gestureHandling="none"
                  disableDefaultUI={true}
                  mapId="bf51a910020fa25a"
                >
                  <AdvancedMarker
                    position={{
                      lat: selectedLocation.lat,
                      lng: selectedLocation.lng,
                    }}
                  />
                </Map>
              </APIProvider>
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

interface MapWithControlsProps {
  initialLocation: Pick<LocationData, "lat" | "lng">;
  onLocationSelect: (location: LocationData) => void;
}

const MapWithControls = ({
  initialLocation,
  onLocationSelect,
}: MapWithControlsProps) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [searchQuery, setSearchQuery] = useState("");
  const map = useMap();

  // Handle map click
  const handleMapClick = (e: MapMouseEvent) => {
    if (e.detail && e.detail.latLng && marker) {
      const position = e.detail.latLng;
      marker.position = position;

      // Get geocoding info for the clicked location
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat: position.lat, lng: position.lng } },
        (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            extractLocationData(results[0], onLocationSelect);
          }
        }
      );
    }
  };

  // Update marker when initialLocation changes
  useEffect(() => {
    if (marker && initialLocation) {
      marker.position = {
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      };
    }
  }, [marker, initialLocation]);

  return (
    <Map
      defaultZoom={13}
      defaultCenter={{ lat: initialLocation.lat, lng: initialLocation.lng }}
      gestureHandling="greedy"
      mapId="bf51a910020fa25a"
      onClick={handleMapClick}
    >
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: initialLocation.lat, lng: initialLocation.lng }}
        draggable={true}
      />
      <MapControl position={ControlPosition.TOP}>
        <div className="p-2 bg-white rounded-md shadow-md w-64">
          <PlaceAutocomplete
            value={searchQuery}
            onChange={setSearchQuery}
            onPlaceSelect={(place) => {
              if (place && place.geometry?.location) {
                // Update marker position
                if (marker) {
                  const location = place.geometry.location;
                  marker.position = location;

                  // Center map on the selected place
                  if (map) {
                    if (place.geometry.viewport) {
                      map.fitBounds(place.geometry.viewport);
                    } else {
                      map.setCenter(location);
                      map.setZoom(17);
                    }
                  }
                }

                // Extract location data
                extractLocationData(place, onLocationSelect);
              }
            }}
          />
        </div>
      </MapControl>
      <MarkerEventHandler marker={marker} onLocationSelect={onLocationSelect} />
    </Map>
  );
};

interface PlaceAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete = ({
  value,
  onChange,
  onPlaceSelect,
}: PlaceAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: [
        "geometry",
        "formatted_address",
        "place_id",
        "address_components",
      ],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [places, onPlaceSelect]);

  return (
    <Input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search for a location..."
      className="w-full"
    />
  );
};

interface MarkerEventHandlerProps {
  marker: google.maps.marker.AdvancedMarkerElement | null;
  onLocationSelect: (location: LocationData) => void;
}

const MarkerEventHandler = ({
  marker,
  onLocationSelect,
}: MarkerEventHandlerProps) => {
  useEffect(() => {
    if (!marker) return;

    // Add drag end listener to marker
    const handleMarkerDragEnd = () => {
      const position = marker.position;
      if (position) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(
          {
            location: {
              lat:
                typeof position.lat === "function"
                  ? position.lat()
                  : position.lat,
              lng:
                typeof position.lng === "function"
                  ? position.lng()
                  : position.lng,
            },
          },
          (results, status) => {
            if (
              status === google.maps.GeocoderStatus.OK &&
              results &&
              results[0]
            ) {
              extractLocationData(results[0], onLocationSelect);
            }
          }
        );
      }
    };

    marker.addEventListener("dragend", handleMarkerDragEnd);

    return () => {
      marker.removeEventListener("dragend", handleMarkerDragEnd);
    };
  }, [marker, onLocationSelect]);

  return null;
};

// Helper function to extract location data from Google Maps place or geocoding result
const extractLocationData = (
  place: google.maps.places.PlaceResult | google.maps.GeocoderResult,
  callback: (location: LocationData) => void
) => {
  const location = place.geometry?.location;

  if (!location) return;

  // Extract lat/lng, handling both function and property access
  let lat: number;
  let lng: number;

  if (typeof location.lat === "function") {
    lat = location.lat();
    lng = location.lng();
  } else {
    lat = 0;
    lng = 0;
  }

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

  callback(newLocationData);
};

export default EditableGoogleMap;
