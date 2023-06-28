import "./styles.css";

const fetchData = async () => {
  // const url =
  //   "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  // const res = await fetch(url);
  // const data = await res.json();

  // source for multiple fetch requests:
  // https://www.youtube.com/watch?v=gwY5wMe7Xbw

  const fetchArray = [
    fetch(
      "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326"
    ),
    fetch(
      "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f"
    ),
    fetch(
      "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e"
    )
  ];

  const res = await Promise.all(fetchArray);
  const data = await Promise.all(res.map((el) => el.json()));

  // console.log(data.features.properties.name);
  // const features = data.features;

  // const res_2 = await fetch(
  //   "https://statfin.stat.fi/PxWeb/sq/4bb2c735-1dc3-4c5e-bde7-2165df85e65f"
  // );
  // const posMigration = await res_2.json();

  // const res_3 = await fetch(
  //   "https://statfin.stat.fi/PxWeb/sq/944493ca-ea4d-4fd9-a75c-4975192f7b6e"
  // );
  // const negMigration = await res_3.json();

  // console.log(data);
  let [municipalities, pos, neg] = data;
  // console.log(`data 0: ${municipalities.features[0].properties.nimi}`);
  // console.log(`data 1: ${pos}`);
  // console.log(`data 2: ${neg}`);

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  //const [municipalities, posMigration, negMigration] = data;

  const getFeature = (feature, layer) => {
    if (feature && feature.properties)
      layer.bindTooltip(feature.properties.nimi);
  };

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    weight: 2
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

fetchData();
