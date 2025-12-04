import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { Issue, IssueLevels } from '@/types/pagesData';

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
    'Level1': '#ef4444',
    'Level2': '#fbff08ff',
    'Level3': '#10b981',
  };
  return level ? colors[level] : '#3b82f6';
};

const IssueMap: React.FC<IssueMapProps> = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <p className="text-gray-500">No issues with geolocation found</p>
      </div>
    );
  }

  const centerLat = issues.reduce((sum, issue) => sum + (issue.geoLocation?.lat || 0), 0) / issues.length;
  const centerLng = issues.reduce((sum, issue) => sum + (issue.geoLocation?.lng || 0), 0) / issues.length;
  const center: LatLngExpression = [centerLat, centerLng];

  const locationGroups = new Map<string, Issue[]>();
  issues.forEach(issue => {
    if (issue.geoLocation?.lat && issue.geoLocation?.lng) {
      const key = `${issue.geoLocation.lat},${issue.geoLocation.lng}`;
      if (!locationGroups.has(key)) {
        locationGroups.set(key, []);
      }
      locationGroups.get(key)!.push(issue);
    }
  });

  // Much larger tooltip offsets to prevent overlap
  const tooltipPositions: Array<{ direction: 'right' | 'left' | 'top' | 'bottom', offset: [number, number] }> = [
    { direction: 'right', offset: [50, 0] },      // Far right
    { direction: 'left', offset: [-50, 0] },      // Far left
    { direction: 'top', offset: [0, -80] },       // Far top
    { direction: 'bottom', offset: [0, 80] },     // Far bottom
    { direction: 'right', offset: [50, -100] },   // Right upper
    { direction: 'left', offset: [-50, -100] },   // Left upper
    { direction: 'right', offset: [50, 100] },    // Right lower
    { direction: 'left', offset: [-50, 100] },    // Left lower
    { direction: 'top', offset: [80, -80] },      // Top right
    { direction: 'bottom', offset: [80, 80] },    // Bottom right
    { direction: 'top', offset: [-80, -80] },     // Top left
    { direction: 'bottom', offset: [-80, 80] },   // Bottom left
  ];

  return (
    <div style={{ height: '600px', width: '100%' }} className="rounded-lg shadow-lg">
      <MapContainer
        {...({
          center,
          zoom: 15,
          scrollWheelZoom: true,
          style: { height: '100%', width: '100%' },
        } as any)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {issues.map((issue) => {
          if (!issue.geoLocation?.lat || !issue.geoLocation?.lng) return null;

          const locationKey = `${issue.geoLocation.lat},${issue.geoLocation.lng}`;
          const issuesAtLocation = locationGroups.get(locationKey) || [];
          
          let offsetLat = issue.geoLocation.lat;
          let offsetLng = issue.geoLocation.lng;
          
          const issueIndex = issuesAtLocation.findIndex(i => i.id === issue.id);
          
        
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

          const markerIcon = new Icon({
            iconUrl: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="${color}" stroke="#fff" stroke-width="2" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`)}`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          return (
            <Marker
              key={issue.id}
              position={position}
              {...({ icon: markerIcon } as any)}
            >
              <Tooltip 
                {...({
                  permanent: true,
                  direction: tooltipConfig.direction,
                  offset: tooltipConfig.offset,
                  className: "custom-tooltip",
                  opacity: 0.98,
                } as any)}
              >
                <div style={{ 
                  minWidth: '220px', 
                  maxWidth: '260px',
                  fontSize: '11px', 
                  backgroundColor: 'white',
                  padding: '6px 8px',
          
                }}>
                  <h3 style={{ 
            
                  }}>
                    Issue #{issue.id}
                  </h3>
                  <div style={{ lineHeight: '1.4' }}>
                    <p style={{ margin: '2px 0' }}><strong>Status:</strong> {issue.status}</p>
                    {issue.issueType && (
                      <>
                        <p style={{ margin: '2px 0' }}><strong>Type:</strong> {issue.issueType.name}</p>
                        <p style={{ margin: '2px 0' }}><strong>Level:</strong> {issue.issueType.level}</p>
                      </>
                    )}
                    {issue.details && (
                      <p style={{ margin: '2px 0' }}>
                        <strong>Details:</strong> {issue.details.substring(0, 50)}
                        {issue.details.length > 50 ? '...' : ''}
                      </p>
                    )}
                    {issue.client && (
                      <p style={{ margin: '2px 0' }}><strong>Client:</strong> {issue.client.name}</p>
                    )}
                    {issue.location && (
                      <p style={{ margin: '2px 0' }}><strong>Location:</strong> {issue.location.name}</p>
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