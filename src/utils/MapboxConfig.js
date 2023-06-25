import mapboxgl from 'mapbox-gl'

const tokens = {
  my: 'pk.eyJ1Ijoicmc0c3VuIiwiYSI6ImNsaDBpMmlzOTB0dXkzaXF2Mmd0dXVjZnUifQ.CUYEAn59uEs3A9GON_oVPQ',
  online: 'pk.eyJ1IjoiYnBhY2h1Y2EiLCJhIjoiY2lxbGNwaXdmMDAweGZxbmg5OGx2YWo5aSJ9.zda7KLJF3TH84UU6OhW16w',
}

mapboxgl.accessToken = tokens.online

export default mapboxgl
