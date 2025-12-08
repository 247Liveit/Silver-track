import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Issue, IssueLevels } from '@/types/pagesData';

// Fix default Leaflet icon (so it works with bundlers)
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface IssueMapProps {
  issues: Issue[];
}

const getMarkerColor = (level?: IssueLevels) => {
  const colors: Record<string, string> = {
    Level1: '#ef4444',
    Level2: '#fbff08ff', // 8-digit hex: includes alpha
    Level3: '#10b981',
  };
  return level ? colors[level] ?? '#3b82f6' : '#3b82f6';
};

// Safe base64 encoder for SVG (works in browser & Node)
const encodeSvg = (svg: string): string => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(svg);
  }
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(svg).toString('base64');
  }
  // Fallback (shouldn't really hit this in normal environments)
  return svg;
};

const IssueMap: React.FC<IssueMapProps> = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No issues with geolocation found</p>
      </div>
    );
  }

  console.log("Rendering IssueMap with issues:", issues);

  // Use only issues that actually have coordinates
  const issuesWithGeo = issues.filter(
    (i) =>
      i.geoLocation?.lat !== undefined &&
      i.geoLocation?.lng !== undefined &&
      i.geoLocation?.lat !== null &&
      i.geoLocation?.lng !== null
  );

  if (issuesWithGeo.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No issues with geolocation found</p>
      </div>
    );
  }

  const centerLat =
    issuesWithGeo.reduce((sum, issue) => sum + issue.geoLocation!.lat, 0) /
    issuesWithGeo.length;
  const centerLng =
    issuesWithGeo.reduce((sum, issue) => sum + issue.geoLocation!.lng, 0) /
    issuesWithGeo.length;

  const center: LatLngExpression = [centerLat, centerLng];

  // Group issues by exact lat/lng
  const locationGroups = new Map<string, Issue[]>();
  issuesWithGeo.forEach((issue) => {
    const { lat, lng } = issue.geoLocation!;
    const key = `${lat},${lng}`;
    if (!locationGroups.has(key)) {
      locationGroups.set(key, []);
    }
    locationGroups.get(key)!.push(issue);
  });

  // Larger tooltip offsets to help prevent overlap
  const tooltipPositions: Array<{
    direction: 'right' | 'left' | 'top' | 'bottom';
    offset: [number, number];
  }> = [
      { direction: 'right', offset: [50, 0] }, // Far right
      { direction: 'left', offset: [-50, 0] }, // Far left
      { direction: 'top', offset: [0, -80] }, // Far top
      { direction: 'bottom', offset: [0, 80] }, // Far bottom
      { direction: 'right', offset: [50, -100] }, // Right upper
      { direction: 'left', offset: [-50, -100] }, // Left upper
      { direction: 'right', offset: [50, 100] }, // Right lower
      { direction: 'left', offset: [-50, 100] }, // Left lower
      { direction: 'top', offset: [80, -80] }, // Top right
      { direction: 'bottom', offset: [80, 80] }, // Bottom right
      { direction: 'top', offset: [-80, -80] }, // Top left
      { direction: 'bottom', offset: [-80, 80] }, // Bottom left
    ];

  return (
    <div style={{ height: '600px', width: '100%', position: 'relative', zIndex: 0 }} className="rounded-lg shadow-lg">
      <MapContainer
        //@ts-ignore
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {issuesWithGeo.map((issue) => {
          const { lat, lng } = issue.geoLocation!;
          const locationKey = `${lat},${lng}`;
          const issuesAtLocation = locationGroups.get(locationKey) || [];

          let offsetLat = lat;
          let offsetLng = lng;

          let issueIndex = issuesAtLocation.findIndex((i) => i.id === issue.id);
          if (issueIndex === -1) issueIndex = 0; // defensive fallback

          // Spread markers around if multiple issues share same location
          if (issuesAtLocation.length > 1) {
            const angle = (issueIndex / issuesAtLocation.length) * 2 * Math.PI;
            const baseDistance = 0.0008;
            const offsetDistance = baseDistance * (1 + Math.floor(issueIndex / 4) * 0.8);

            offsetLat += Math.cos(angle) * offsetDistance;
            offsetLng += Math.sin(angle) * offsetDistance;
          }

          const position: LatLngExpression = [offsetLat, offsetLng];
          const color = getMarkerColor(issue.issueType?.level);

          const tooltipConfig = tooltipPositions[issueIndex % tooltipPositions.length];

          const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
            <path fill="${color}" stroke="#fff" stroke-width="2"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5
                 c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5
                 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>`;

          const iconUrl = `data:image/svg+xml;base64,${encodeSvg(svg)}`;

          const issueMarkerIcon = new Icon({
            iconUrl,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          return (
            <Marker key={issue.id} position={position}
              //@ts-ignore
              icon={issueMarkerIcon as any}
            >
              <Tooltip
                //@ts-ignore
                permanent
                direction={tooltipConfig.direction}
                offset={tooltipConfig.offset as any}
                className="custom-tooltip"
                opacity={0.98}
              >
                <div
                  style={{
                    minWidth: '220px',
                    maxWidth: '260px',
                    fontSize: '11px',
                    backgroundColor: 'white',
                    padding: '6px 8px',
                  }}
                >
                  <h3>Issue #{issue.id}</h3>
                  <div style={{ lineHeight: '1.4' }}>
                    <p style={{ margin: '2px 0' }}>
                      <strong>Status:</strong> {issue.status}
                    </p>
                    {issue.issueType && (
                      <>
                        <p style={{ margin: '2px 0' }}>
                          <strong>Type:</strong> {issue.issueType.name}
                        </p>
                        <p style={{ margin: '2px 0' }}>
                          <strong>Level:</strong> {issue.issueType.level}
                        </p>
                      </>
                    )}
                    {issue.details && (
                      <p style={{ margin: '2px 0' }}>
                        <strong>Details:</strong>{' '}
                        {issue.details.substring(0, 50)}
                        {issue.details.length > 50 ? '...' : ''}
                      </p>
                    )}
                    {issue.client && (
                      <p style={{ margin: '2px 0' }}>
                        <strong>Client:</strong> {issue.client.name}
                      </p>
                    )}
                    {issue.location && (
                      <p style={{ margin: '2px 0' }}>
                        <strong>Location:</strong> {issue.location.name}
                      </p>
                    )}
                  </div>
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default IssueMap;
