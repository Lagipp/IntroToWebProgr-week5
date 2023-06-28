import "./styles.css";

const fetchData = async () => {
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res = await fetch(url);
  const data = await res.json();

  // console.log(data.features.properties.name);
  // const features = data.features;

  initMap(data);
};

const initMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  // const municipalitiesData = [];
  // let id = 0;

  // data.features.forEach((el) => {
  //   municipalitiesData.push({
  //     id: id,
  //     name: el.properties.nimi
  //   });
  //   id += 1;
  // });

  // console.log(municipalitiesData);

  const getFeature = (feature, layer) => {
    if (feature && feature.properties)
      layer.bindTooltip(feature.properties.nimi);
  };

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature,
    weight: 2
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

fetchData();
