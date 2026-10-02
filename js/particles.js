/* Particle field + calculator theme-overlay canvases (canvas transparency / mix-blend-mode:screen)
   ONLY simple fade-in/out linear drifts. No orbits, sprinkles, sparkle variants,
   formula formations, swirl, circular paths, or residual ATC Math particle types. */
(function (global) {
  'use strict';
  if (typeof global.globalBlobs === 'undefined') {
    global.globalBlobs = null;
  }

(function(){
  var isQuiz = /\/quiz(\/|$)/.test(location.pathname) || !!document.getElementById('fxCanvas');
  if(!isQuiz) document.body.style.background = "#0d0d0d";
})();
function buildGridSVG(isLight){const c=isLight?'rgba(0,0,0,0.04)':'rgba(255,255,255,0.04)';return `<svg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'><path d='M0 0 L60 0 M0 0 L0 60' stroke='${c}' stroke-width='0.5' fill='none'/></svg>`;}
let encodedGrid = '';
function readAccentRgb(){const rs=getComputedStyle(document.documentElement);let raw=(rs.getPropertyValue('--accent-0-rgb')||'').trim();if(!raw){const hex=(rs.getPropertyValue('--accent-0')||'').trim();if(/^#[0-9A-Fa-f]{6}$/.test(hex)){raw=parseInt(hex.slice(1,3),16)+', '+parseInt(hex.slice(3,5),16)+', '+parseInt(hex.slice(5,7),16);}}return raw||'255, 136, 0';}
let particleAccentRgb=readAccentRgb();
function refreshParticleColors(){particleAccentRgb=readAccentRgb();}
function refreshThemeSVGs(){const rs=getComputedStyle(document.documentElement);const isLight=document.documentElement.classList.contains('light-mode');encodedGrid=encodeURIComponent(buildGridSVG(isLight).replace(/\s+/g,' '));const bgDiv=document.getElementById('el-arquitecto-bg-layer');if(bgDiv)bgDiv.style.backgroundImage=`url("data:image/svg+xml;charset=utf-8,${encodedGrid}")`;refreshParticleColors();if(typeof global.refreshFxAccentColors==='function'){try{global.refreshFxAccentColors();}catch(e){}}if(typeof updateOverlayCanvases==='function'){try{updateOverlayCanvases();}catch(e){}}}
const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);
styleSheet.textContent = `#el-arquitecto-bg-layer{content:'';position:fixed;top:0;left:0;width:100%;height:100%;z-index:-3;pointer-events:none;background-size:60px 60px;opacity:0.4;mix-blend-mode:multiply}#el-arquitecto-particle-canvas{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;mix-blend-mode:screen}`;
let canvas = document.createElement("canvas");
canvas.id = "el-arquitecto-particle-canvas";
canvas.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;mix-blend-mode:screen;";
document.body.appendChild(canvas);
const bgDiv = document.createElement('div'); bgDiv.id = 'el-arquitecto-bg-layer'; document.body.appendChild(bgDiv);
let particles = [];
function resizeCanvas() {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
let program, positionLoc, sizeLoc, alphaLoc, resolutionLoc, colorLoc;
let positionBuffer, sizeBuffer, alphaBuffer;
let lastFrameTime = performance.now();
if (gl) {
const vsSource = `attribute vec2 a_position;attribute float a_size;attribute float a_alpha;uniform vec2 u_resolution;varying float v_alpha;void main(){vec2 zeroToOne=a_position/u_resolution;vec2 zeroToTwo=zeroToOne*2.0;vec2 clipSpace=zeroToTwo-1.0;gl_Position=vec4(clipSpace*vec2(1,-1),0,1);gl_PointSize=a_size*2.0;v_alpha=a_alpha;}`;
const fsSource = `precision mediump float;varying float v_alpha;uniform vec3 u_accentColor;void main(){vec2 coord=gl_PointCoord-vec2(0.5);float dist=length(coord);if(dist>0.5)discard;float glow=1.0-(dist*2.0);glow=pow(glow,2.5);gl_FragColor=vec4(u_accentColor,v_alpha*glow);}`;
function createShader(gl,type,source){const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);return shader;}
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
positionLoc = gl.getAttribLocation(program, "a_position");
sizeLoc = gl.getAttribLocation(program, "a_size");
alphaLoc = gl.getAttribLocation(program, "a_alpha");
resolutionLoc = gl.getUniformLocation(program, "u_resolution");
colorLoc = gl.getUniformLocation(program, "u_accentColor");
positionBuffer = gl.createBuffer();
sizeBuffer = gl.createBuffer();
alphaBuffer = gl.createBuffer();
}

function resetDriftParticle(p, randomizeLife){
const sz=Math.random()*2.0+1.4;
p.x=Math.random()*canvas.width;
p.y=Math.random()*canvas.height;
p.vx=(Math.random()-0.5)*0.25;
p.vy=(Math.random()-0.5)*0.25;
p.size=sz;
p.fadeIn=0.0035+Math.random()*0.0045;
p.fadeOut=0.0025+Math.random()*0.004;
p.hold=0.28+Math.random()*0.32;
if (randomizeLife) {
if (Math.random() < 0.5) {
p.phase='in';
p.alpha=Math.random()*p.hold;
} else {
p.phase='out';
p.alpha=Math.random()*p.hold;
}
} else {
p.phase='in';
p.alpha=0;
}
}
function initParticles(){
particles=[];
// Soft ambient field only — no dense ATC Math sprinkles / orbit rings.
const count=160;
for(let i=0;i<count;i++){
const p={};
resetDriftParticle(p,true);
particles.push(p);
}
}
initParticles();
function renderParticles() {
const now = performance.now();
const deltaTime = now - lastFrameTime;
lastFrameTime = now;
const timeScale = Math.min(deltaTime / 16.66, 4.0);
const accent0 = particleAccentRgb;
const [r,g,b] = accent0.split(',').map(n=>parseFloat(n)/255);
const positions = new Float32Array(particles.length * 2);
const sizes = new Float32Array(particles.length);
const alphas = new Float32Array(particles.length);
particles.forEach((p, i) => {
// Linear drift only.
p.x += p.vx * timeScale;
p.y += p.vy * timeScale;
if (p.x < -10) p.x = canvas.width + 10;
if (p.x > canvas.width + 10) p.x = -10;
if (p.y < -10) p.y = canvas.height + 10;
if (p.y > canvas.height + 10) p.y = -10;
let currentAlpha = p.alpha || 0;
if (p.phase === 'in') {
currentAlpha += p.fadeIn * timeScale;
if (currentAlpha >= p.hold) { currentAlpha = p.hold; p.phase = 'out'; }
} else {
currentAlpha -= p.fadeOut * timeScale;
if (currentAlpha <= 0) {
resetDriftParticle(p, false);
currentAlpha = 0;
}
}
positions[i * 2] = p.x;
positions[i * 2 + 1] = p.y;
sizes[i] = p.size;
alphas[i] = currentAlpha;
p.alpha = currentAlpha;
});
if (gl) {
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
gl.useProgram(program);
gl.uniform3f(colorLoc, r, g, b);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(positionLoc);
gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(sizeLoc);
gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 0, 0);
gl.bindBuffer(gl.ARRAY_BUFFER, alphaBuffer);
gl.bufferData(gl.ARRAY_BUFFER, alphas, gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(alphaLoc);
gl.vertexAttribPointer(alphaLoc, 1, gl.FLOAT, false, 0, 0);
gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);
gl.drawArrays(gl.POINTS, 0, particles.length);
}
updateOverlayCanvases();
requestAnimationFrame(renderParticles);
}
function updateOverlayCanvases() {
const cw = document.getElementById('calculator-widget');
if (!cw || cw.style.display === 'none') return;
const overlays = cw.querySelectorAll('.calc-theme-overlay');
if (!overlays.length || !particles.length) return;
const rgb = readAccentRgb();
overlays.forEach(function(ov) {
const rect = ov.getBoundingClientRect();
const w = Math.round(rect.width), h = Math.round(rect.height);
if (!w || !h) return;
if (ov.width !== w) ov.width = w;
if (ov.height !== h) ov.height = h;
const ctx = ov.getContext('2d');
ctx.clearRect(0, 0, w, h);
particles.forEach(function(p) {
const lx = p.x - rect.left;
const ly = p.y - rect.top;
const r = p.size;
if (lx < -r || lx > w + r || ly < -r || ly > h + r) return;
const a = p.alpha || 0;
if (a <= 0) return;
const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, r);
grad.addColorStop(0, `rgba(${rgb},${a})`);
grad.addColorStop(1, `rgba(${rgb},0)`);
ctx.beginPath();
ctx.arc(lx, ly, r, 0, Math.PI * 2);
ctx.fillStyle = grad;
ctx.fill();
});
});
}
if (gl) { renderParticles(); }

  global.refreshParticleColors = refreshParticleColors;
  global.refreshThemeSVGs = refreshThemeSVGs;
  global.updateOverlayCanvases = updateOverlayCanvases;
})(typeof window !== 'undefined' ? window : globalThis);
