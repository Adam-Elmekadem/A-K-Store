import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Array of locations
const locations = [
  {
    position: [34.0557125, -6.8146119],
    label: "AKStore Location<br />Av. Mohamed Taib Al Alaoui, Salé"
  },
  {
    position: [34.0498743, -6.8162629],
    label: "Home Salé"
  },
];

export default function LocationMap() {
  const mapCenter = locations[0].position;

  return (
    <div className="bg-black w-full overflow-hidden py-8 px-25">
      <h3 className="text-3xl font-bold mb-12 text-center font-Guardian text-white">Our Locations</h3>
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-107 md:w-1/2 h-96">
          <MapContainer center={mapCenter} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, idx) => (
              <Marker key={idx} position={loc.position}>
                <Popup>
                  <span dangerouslySetInnerHTML={{ __html: loc.label }} />
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        {/* Text on the right */}
        <div className="w-full md:w-1/2 text-white flex flex-col sm:justify-center">
          <div className='mb-8'>
            <p className="text-8xl text-red-AKred font-poppins mb-2">+55</p>
            <p className="text-lg text-gray-300 font-poppins mb-2">
                Branches Around the world, come visit us!
            </p>
          </div>
          <p className="text-md text-gray-400 font-poppins mb-2">
            <span className="font-bold red-AKred">Address:</span> Av. Mohamed Taib Al Alaoui, Salé, Morocco
          </p>
          <p className="text-md text-gray-400 font-poppins mb-2">
            <span className="font-bold red-AKred">Working Hours:</span> 9:00 AM - 9:00 PM (All week)
          </p>
          <p className="text-md text-gray-400 font-poppins">
            <span className="font-bold red-AKred">Contact:</span> +212 123-456789
          </p>
        </div>
      </div>
    </div>
  );
}