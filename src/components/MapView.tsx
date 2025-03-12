/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

const MapView: React.FC = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    {
      lat: 25.276987,
      lng: 55.296249,
    }
  );
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative w-full h-[500px]">
        <Button
          className="absolute top-2 left-2 z-10"
          onClick={() => setModalOpen(true)}
        >
          Change Location
        </Button>
        <Map center={location!} zoom={12} className="w-full h-full">
          {location && <Marker position={location} />}
        </Map>
      </div>
      <LocationSelector
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={(loc) => setLocation(loc)}
      />
    </>
  );
};

const LocationSelector: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (loc: { lat: number; lng: number }) => void;
}> = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [places, setPlaces] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 3) return;

    const service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions({ input: query }, (predictions) => {
      setPlaces(predictions || []);
    });
  };

  const handleSelect = async (placeId: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (status === "OK" && results && results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        onSelect({ lat: lat(), lng: lng() });
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Select Location</DialogTitle>
        <Input
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <ul className="mt-2 max-h-40 overflow-auto border p-2">
          {places.map((place) => (
            <li
              key={place.place_id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(place.place_id)}
            >
              {place.description}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default MapView;
