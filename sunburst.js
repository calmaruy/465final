chart = {
  const root = partition(data);

  root.each(d => d.current = d);

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, width])
      .style("font", "10px sans-serif");

  const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${width / 2})`);

  const path = g.append("g")
    .selectAll("path")
    .data(root.descendants().slice(1))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => arc(d.current));

  path.filter(d => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

  path.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
    .selectAll("text")
    .data(root.descendants().slice(1))
    .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => d.data.name);

  const parent = g.append("circle")
      .datum(root)
      .attr("r", radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked);

  function clicked(p) {
    parent.datum(p.parent || root);

    root.each(d => d.target = {
      x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
      y0: Math.max(0, d.y0 - p.depth),
      y1: Math.max(0, d.y1 - p.depth)
    });

    const t = g.transition().duration(750);

    // Transition the data on all arcs, even the ones that aren’t visible,
    // so that if this transition is interrupted, entering arcs will start
    // the next transition from the desired position.
    path.transition(t)
        .tween("data", d => {
          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
      .filter(function(d) {
        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
      })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => arc(d.current));

    label.filter(function(d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));
  }
  
  function arcVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
  }

  function labelVisible(d) {
    return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
  }

  function labelTransform(d) {
    const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
    const y = (d.y0 + d.y1) / 2 * radius;
    return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
  }

  return svg.node();
}

data = Object {name: "flare", children: Array(10)[
  0: Object {name: "analytics", children: Array(3)}
  1: Object {name: "animate", children: Array(12)}
  2: Object {name: "data", children: Array(7)}
  3: Object {name: "display", children: Array(4)}
  4: Object {name: "flex", children: Array(1)}
  5: Object {name: "physics", children: Array(8)}
  6: Object {name: "query", children: Array(29)}
  7: Object {name: "scale", children: Array(10)}
  8: Object {name: "util", children: Array(19)}
  9: Object {name: "vis", children: Array(7)}
]}

data = FileAttachment("flare-2.json").json()

partition = ƒ(data)

partition = data => {
  const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
  return d3.partition()
      .size([2 * Math.PI, root.height + 1])
    (root);
}

color = ƒ(i)
color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
format = ƒ(t)
format = d3.format(",d")
width = 932
width = 932
radius = 155.33333333333334
radius = width / 6
arc = ƒ()
arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
    
d3 = Object {
  event: null
  format: ƒ(t)
  formatPrefix: ƒ(t, n)
  timeFormat: ƒ(t)
  timeParse: ƒ(t)
  utcFormat: ƒ(t)
  utcParse: ƒ(t)
  FormatSpecifier: ƒ(t)
  active: ƒ(t, n)
  arc: ƒ()
  area: ƒ()
  areaRadial: ƒ()
  ascending: ƒ(t, n)
  autoType: ƒ(t)
  axisBottom: ƒ(t)
  axisLeft: ƒ(t)
  axisRight: ƒ(t)
  axisTop: ƒ(t)
  bisect: ƒ(n, e, r, i)
  bisectLeft: ƒ(n, e, r, i)
  bisectRight: ƒ(n, e, r, i)
  bisector: ƒ(t)
  blob: ƒ(t, n)
  brush: ƒ()
  brushSelection: ƒ(t)
  brushX: ƒ()
  brushY: ƒ()
  buffer: ƒ(t, n)
  chord: ƒ()
  clientPoint: ƒ(t, n)
  cluster: ƒ()
  color: ƒ(t)
  contourDensity: ƒ()
  contours: ƒ()
  create: ƒ(t)
  creator: ƒ(t)
  cross: ƒ(t, n, e)
  csv: ƒ(n, e, r)
  csvFormat: ƒ(n, e)
  csvFormatBody: ƒ(t, n)
  csvFormatRow: ƒ(n)
  csvFormatRows: ƒ(t)
  csvFormatValue: ƒ(t)
  csvParse: ƒ(t, n)
  csvParseRows: ƒ(t, n)
  cubehelix: ƒ(t, n, e, r)
  curveBasis: ƒ(t)
  curveBasisClosed: ƒ(t)
  curveBasisOpen: ƒ(t)
  curveBundle: ƒ(t)
  curveCardinal: ƒ(t)
  curveCardinalClosed: ƒ(t)
  curveCardinalOpen: ƒ(t)
  curveCatmullRom: ƒ(t)
  curveCatmullRomClosed: ƒ(t)
  curveCatmullRomOpen: ƒ(t)
  curveLinear: ƒ(t)
  curveLinearClosed: ƒ(t)
  curveMonotoneX: ƒ(t)
  curveMonotoneY: ƒ(t)
  curveNatural: ƒ(t)
  curveStep: ƒ(t)
  curveStepAfter: ƒ(t)
  curveStepBefore: ƒ(t)
  customEvent: ƒ(n, e, r, i)
  descending: ƒ(t, n)
  deviation: ƒ(t, n)
  dispatch: ƒ()
  drag: ƒ()
  dragDisable: ƒ(t)
  dragEnable: ƒ(t, n)
  dsv: ƒ(t, n, e, r)
  dsvFormat: ƒ(t)
  easeBack: ƒ(t)
  easeBackIn: ƒ(t)
  easeBackInOut: ƒ(t)
  easeBackOut: ƒ(t)
  easeBounce: ƒ(t)
  easeBounceIn: ƒ(t)
  easeBounceInOut: ƒ(t)
  easeBounceOut: ƒ(t)
  easeCircle: ƒ(t)
  easeCircleIn: ƒ(t)
  easeCircleInOut: ƒ(t)
  easeCircleOut: ƒ(t)
  easeCubic: ƒ(t)
  easeCubicIn: ƒ(t)
  easeCubicInOut: ƒ(t)
  easeCubicOut: ƒ(t)
  easeElastic: ƒ(t)
  easeElasticIn: ƒ(t)
  easeElasticInOut: ƒ(t)
  easeElasticOut: ƒ(t)
  easeExp: ƒ(t)
  easeExpIn: ƒ(t)
  easeExpInOut: ƒ(t)
  easeExpOut: ƒ(t)
  easeLinear: ƒ(t)
  easePoly: ƒ(t)
  easePolyIn: ƒ(t)
  easePolyInOut: ƒ(t)
  easePolyOut: ƒ(t)
  easeQuad: ƒ(t)
  easeQuadIn: ƒ(t)
  easeQuadInOut: ƒ(t)
  easeQuadOut: ƒ(t)
  easeSin: ƒ(…)
  easeSinIn: ƒ(t)
  easeSinInOut: ƒ(…)
  easeSinOut: ƒ(t)
  entries: ƒ(t)
  extent: ƒ(t, n)
  forceCenter: ƒ(t, n)
  forceCollide: ƒ(t)
  forceLink: ƒ(t)
  forceManyBody: ƒ()
  forceRadial: ƒ(t, n, e)
  forceSimulation: ƒ(t)
  forceX: ƒ(t)
  forceY: ƒ(t)
  formatDefaultLocale: ƒ(n)
  formatLocale: ƒ(t)
  formatSpecifier: ƒ(t)
  geoAlbers: ƒ()
  geoAlbersUsa: ƒ()
  geoArea: ƒ(t)
  geoAzimuthalEqualArea: ƒ()
  geoAzimuthalEqualAreaRaw: ƒ(n, e)
  geoAzimuthalEquidistant: ƒ()
  geoAzimuthalEquidistantRaw: ƒ(n, e)
  geoBounds: ƒ(t)
  geoCentroid: ƒ(t)
  geoCircle: ƒ()
  geoClipAntimeridian: ƒ(i)
  geoClipCircle: ƒ(t)
  geoClipExtent: ƒ()
  geoClipRectangle: ƒ(t, n, e, r)
  geoConicConformal: ƒ()
  geoConicConformalRaw: ƒ(t, n)
  geoConicEqualArea: ƒ()
  geoConicEqualAreaRaw: ƒ(t, n)
  geoConicEquidistant: ƒ()
  geoConicEquidistantRaw: ƒ(t, n)
  geoContains: ƒ(t, n)
  geoDistance: ƒ(t, n)
  geoEqualEarth: ƒ()
  geoEqualEarthRaw: ƒ(t, n)
  geoEquirectangular: ƒ()
  geoEquirectangularRaw: ƒ(t, n)
  geoGnomonic: ƒ()
  geoGnomonicRaw: ƒ(t, n)
  geoGraticule: ƒ()
  geoGraticule10: ƒ()
  geoIdentity: ƒ()
  geoInterpolate: ƒ(t, n)
  geoLength: ƒ(t)
  geoMercator: ƒ()
  geoMercatorRaw: ƒ(t, n)
  geoNaturalEarth1: ƒ()
  geoNaturalEarth1Raw: ƒ(t, n)
  geoOrthographic: ƒ()
  geoOrthographicRaw: ƒ(t, n)
  geoPath: ƒ(t, n)
  geoProjection: ƒ(t)
  geoProjectionMutator: ƒ(t)
  geoRotation: ƒ(t)
  geoStereographic: ƒ()
  geoStereographicRaw: ƒ(t, n)
  geoStream: ƒ(t, n)
  geoTransform: ƒ(t)
  geoTransverseMercator: ƒ()
  geoTransverseMercatorRaw: ƒ(t, n)
  gray: ƒ(t, n)
  hcl: ƒ(t, n, e, r)
  hierarchy: ƒ(t, n)
  histogram: ƒ()
  hsl: ƒ(t, n, e, r)
  html: ƒ(n, e)
  image: ƒ(t, n)
  interpolate: ƒ(t, n)
  interpolateArray: ƒ(t, n)
  interpolateBasis: ƒ(t)
  interpolateBasisClosed: ƒ(t)
  interpolateBlues: ƒ(t)
  interpolateBrBG: ƒ(t)
  interpolateBuGn: ƒ(t)
  interpolateBuPu: ƒ(t)
  interpolateCividis: ƒ(t)
  interpolateCool: ƒ(t)
  interpolateCubehelix: ƒ(n, r)
  interpolateCubehelixDefault: ƒ(t)
  interpolateCubehelixLong: ƒ(n, r)
  interpolateDate: ƒ(t, n)
  interpolateDiscrete: ƒ(t)
  interpolateGnBu: ƒ(t)
  interpolateGreens: ƒ(t)
  interpolateGreys: ƒ(t)
  interpolateHcl: ƒ(n, e)
  interpolateHclLong: ƒ(n, e)
  interpolateHsl: ƒ(n, e)
  interpolateHslLong: ƒ(n, e)
  interpolateHue: ƒ(t, n)
  interpolateInferno: ƒ(e)
  interpolateLab: ƒ(t, n)
  interpolateMagma: ƒ(e)
  interpolateNumber: ƒ(t, n)
  interpolateNumberArray: ƒ(t, n)
  interpolateObject: ƒ(t, n)
  interpolateOrRd: ƒ(t)
  interpolateOranges: ƒ(t)
  interpolatePRGn: ƒ(t)
  interpolatePiYG: ƒ(t)
  interpolatePlasma: ƒ(e)
  interpolatePuBu: ƒ(t)
  interpolatePuBuGn: ƒ(t)
  interpolatePuOr: ƒ(t)
  interpolatePuRd: ƒ(t)
  interpolatePurples: ƒ(t)
  interpolateRainbow: ƒ(t)
  interpolateRdBu: ƒ(t)
  interpolateRdGy: ƒ(t)
  interpolateRdPu: ƒ(t)
  interpolateRdYlBu: ƒ(t)
  interpolateRdYlGn: ƒ(t)
  interpolateReds: ƒ(t)
  interpolateRgb: ƒ(t, n)
  interpolateRgbBasis: ƒ(n)
  interpolateRgbBasisClosed: ƒ(n)
  interpolateRound: ƒ(t, n)
  interpolateSinebow: ƒ(t)
  interpolateSpectral: ƒ(t)
  interpolateString: ƒ(t, n)
  interpolateTransformCss: ƒ(o, a)
  interpolateTransformSvg: ƒ(o, a)
  interpolateTurbo: ƒ(t)
  interpolateViridis: ƒ(e)
  interpolateWarm: ƒ(t)
  interpolateYlGn: ƒ(t)
  interpolateYlGnBu: ƒ(t)
  interpolateYlOrBr: ƒ(t)
  interpolateYlOrRd: ƒ(t)
  interpolateZoom: ƒ(t, n)
  interrupt: ƒ(t, n)
  interval: ƒ(t, n, e)
  isoFormat: ƒ(t)
  isoParse: ƒ(t)
  json: ƒ(t, n)
  keys: ƒ(t)
  lab: ƒ(t, n, e, r)
  lch: ƒ(t, n, e, r)
  line: ƒ()
  lineRadial: ƒ()
  linkHorizontal: ƒ()
  linkRadial: ƒ()
  linkVertical: ƒ()
  local: ƒ()
  map: ƒ(t, n)
  matcher: ƒ(t)
  max: ƒ(t, n)
  mean: ƒ(t, n)
  median: ƒ(t, e)
  merge: ƒ(t)
  min: ƒ(t, n)
  mouse: ƒ(t)
  namespace: ƒ(t)
  namespaces: Object {svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/"}
  nest: ƒ()
  now: ƒ()
  pack: ƒ()
  packEnclose: ƒ(t)
  packSiblings: ƒ(t)
  pairs: ƒ(t, n)
  partition: ƒ()
  path: ƒ()
  permute: ƒ(t, n)
  pie: ƒ()
  piecewise: ƒ(t, n)
  pointRadial: ƒ(t, n)
  polygonArea: ƒ(t)
  polygonCentroid: ƒ(t)
  polygonContains: ƒ(t, n)
  polygonHull: ƒ(t)
  polygonLength: ƒ(t)
  precisionFixed: ƒ(…)
  precisionPrefix: ƒ(t, n)
  precisionRound: ƒ(t, n)
  quadtree: ƒ(t, n, e)
  quantile: ƒ(t, n, e)
  quantize: ƒ(t, n)
  radialArea: ƒ()
  radialLine: ƒ()
  randomBates: ƒ(t)
  randomExponential: ƒ(t)
  randomIrwinHall: ƒ(t)
  randomLogNormal: ƒ()
  randomNormal: ƒ(t, e)
  randomUniform: ƒ(t, e)
  range: ƒ(t, n, e)
  rgb: ƒ(t, n, e, r)
  ribbon: ƒ()
  scaleBand: ƒ()
  scaleDiverging: ƒ()
  scaleDivergingLog: ƒ()
  scaleDivergingPow: ƒ()
  scaleDivergingSqrt: ƒ()
  scaleDivergingSymlog: ƒ()
  scaleIdentity: ƒ(n)
  scaleImplicit: Object {name: "implicit"}
  scaleLinear: ƒ()
  scaleLog: ƒ()
  scaleOrdinal: ƒ()
  scalePoint: ƒ()
  scalePow: ƒ()
  scaleQuantile: ƒ()
  scaleQuantize: ƒ()
  scaleSequential: ƒ()
  scaleSequentialLog: ƒ()
  scaleSequentialPow: ƒ()
  scaleSequentialQuantile: ƒ()
  scaleSequentialSqrt: ƒ()
  scaleSequentialSymlog: ƒ()
  scaleSqrt: ƒ()
  scaleSymlog: ƒ()
  scaleThreshold: ƒ()
  scaleTime: ƒ()
  scaleUtc: ƒ()
  scan: ƒ(t, e)
  schemeAccent: Array(8) ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
  schemeBlues: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeBrBG: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeBuGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeBuPu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeCategory10: Array(10) ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
  schemeDark2: Array(8) ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
  schemeGnBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeGreens: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeGreys: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeOrRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeOranges: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemePRGn: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemePaired: Array(12) ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
  schemePastel1: Array(9) ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
  schemePastel2: Array(8) ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]
  schemePiYG: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemePuBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemePuBuGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemePuOr: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemePuRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemePurples: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeRdBu: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeRdGy: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeRdPu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeRdYlBu: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeRdYlGn: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeReds: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeSet1: Array(9) ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
  schemeSet2: Array(8) ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
  schemeSet3: Array(12) ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
  schemeSpectral: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
  schemeTableau10: Array(10) ["#4e79a7", "#f28e2c", "#e15759", "#76b7b2", "#59a14f", "#edc949", "#af7aa1", "#ff9da7", "#9c755f", "#bab0ab"]
  schemeYlGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeYlGnBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeYlOrBr: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  schemeYlOrRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
  select: ƒ(t)
  selectAll: ƒ(t)
  selection: ƒ()
  selector: ƒ(t)
  selectorAll: ƒ(t)
  set: ƒ(t, n)
  shuffle: ƒ(t, n, e)
  stack: ƒ()
  stackOffsetDiverging: ƒ(t, n)
  stackOffsetExpand: ƒ(t, n)
  stackOffsetNone: ƒ(t, n)
  stackOffsetSilhouette: ƒ(t, n)
  stackOffsetWiggle: ƒ(t, n)
  stackOrderAppearance: ƒ(t)
  stackOrderAscending: ƒ(t)
  stackOrderDescending: ƒ(t)
  stackOrderInsideOut: ƒ(t)
  stackOrderNone: ƒ(t)
  stackOrderReverse: ƒ(t)
  stratify: ƒ()
  style: ƒ(t, n)
  sum: ƒ(t, n)
  svg: ƒ(n, e)
  symbol: ƒ()
  symbolCircle: Object {draw: ƒ(t, n)}
  symbolCross: Object {draw: ƒ(t, n)}
  symbolDiamond: Object {draw: ƒ(t, n)}
  symbolSquare: Object {draw: ƒ(t, n)}
  symbolStar: Object {draw: ƒ(t, n)}
  symbolTriangle: Object {draw: ƒ(t, n)}
  symbolWye: Object {draw: ƒ(t, n)}
  symbols: Array(7) [Object, Object, Object, Object, Object, Object, Object]
  text: ƒ(t, n)
  thresholdFreedmanDiaconis: ƒ(t, e, r)
  thresholdScott: ƒ(t, n, e)
  thresholdSturges: ƒ(t)
  tickFormat: ƒ(n, e, r, i)
  tickIncrement: ƒ(t, n, e)
  tickStep: ƒ(t, n, e)
  ticks: ƒ(t, n, e)
  timeDay: ƒ(n)
  timeDays: ƒ(e, r, o)
  timeFormatDefaultLocale: ƒ(n)
  timeFormatLocale: ƒ(t)
  timeFriday: ƒ(n)
  timeFridays: ƒ(e, r, o)
  timeHour: ƒ(n)
  timeHours: ƒ(e, r, o)
  timeInterval: ƒ(t, n, e, r)
  timeMillisecond: ƒ(n)
  timeMilliseconds: ƒ(e, r, o)
  timeMinute: ƒ(n)
  timeMinutes: ƒ(e, r, o)
  timeMonday: ƒ(n)
  timeMondays: ƒ(e, r, o)
  timeMonth: ƒ(n)
  timeMonths: ƒ(e, r, o)
  timeSaturday: ƒ(n)
  timeSaturdays: ƒ(e, r, o)
  timeSecond: ƒ(n)
  timeSeconds: ƒ(e, r, o)
  timeSunday: ƒ(n)
  timeSundays: ƒ(e, r, o)
  timeThursday: ƒ(n)
  timeThursdays: ƒ(e, r, o)
  timeTuesday: ƒ(n)
  timeTuesdays: ƒ(e, r, o)
  timeWednesday: ƒ(n)
  timeWednesdays: ƒ(e, r, o)
  timeWeek: ƒ(n)
  timeWeeks: ƒ(e, r, o)
  timeYear: ƒ(n)
  timeYears: ƒ(e, r, o)
  timeout: ƒ(t, n, e)
  timer: ƒ(t, n, e)
  timerFlush: ƒ()
  touch: ƒ(t, n, e)
  touches: ƒ(t, n)
  transition: ƒ(t)
  transpose: ƒ(t)
  tree: ƒ()
  treemap: ƒ()
  treemapBinary: ƒ(t, n, e, r, i)
  treemapDice: ƒ(t, n, e, r, i)
  treemapResquarify: ƒ(t, e, r, i, o)
  treemapSlice: ƒ(t, n, e, r, i)
  treemapSliceDice: ƒ(t, n, e, r, i)
  treemapSquarify: ƒ(t, e, r, i, o)
  tsv: ƒ(n, e, r)
  tsvFormat: ƒ(n, e)
  tsvFormatBody: ƒ(t, n)
  tsvFormatRow: ƒ(n)
  tsvFormatRows: ƒ(t)
  tsvFormatValue: ƒ(t)
  tsvParse: ƒ(t, n)
  tsvParseRows: ƒ(t, n)
  utcDay: ƒ(n)
  utcDays: ƒ(e, r, o)
  utcFriday: ƒ(n)
  utcFridays: ƒ(e, r, o)
  utcHour: ƒ(n)
  utcHours: ƒ(e, r, o)
  utcMillisecond: ƒ(n)
  utcMilliseconds: ƒ(e, r, o)
  utcMinute: ƒ(n)
  utcMinutes: ƒ(e, r, o)
  utcMonday: ƒ(n)
  utcMondays: ƒ(e, r, o)
  utcMonth: ƒ(n)
  utcMonths: ƒ(e, r, o)
  utcSaturday: ƒ(n)
  utcSaturdays: ƒ(e, r, o)
  utcSecond: ƒ(n)
  utcSeconds: ƒ(e, r, o)
  utcSunday: ƒ(n)
  utcSundays: ƒ(e, r, o)
  utcThursday: ƒ(n)
  utcThursdays: ƒ(e, r, o)
  utcTuesday: ƒ(n)
  utcTuesdays: ƒ(e, r, o)
  utcWednesday: ƒ(n)
  utcWednesdays: ƒ(e, r, o)
  utcWeek: ƒ(n)
  utcWeeks: ƒ(e, r, o)
  utcYear: ƒ(n)
  utcYears: ƒ(e, r, o)
  values: ƒ(t)
  variance: ƒ(t, n)
  version: "5.16.0"
  voronoi: ƒ()
  window: ƒ(t)
  xml: ƒ(n, e)
  zip: ƒ()
  zoom: ƒ()
  zoomIdentity: Wb {k: 1, x: 0, y: 0}
  zoomTransform: ƒ(t)
}
d3 = require("d3@5")
