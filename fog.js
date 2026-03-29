(function () {
  var canvas = document.getElementById("fog-canvas");
  var ctx = canvas.getContext("2d");

  // Each blob oscillates around a fixed home position — colors stay in their zones
  // Zones: green=left, white=center, red=right
  var blobs = [
    { color: "0, 140, 80",   r: 0.60, homeX: 0.15, homeY: 0.45, ampX: 0.10, ampY: 0.20, phaseX: 0.0, phaseY: 1.0 }, // green
    { color: "0, 140, 80",   r: 0.50, homeX: 0.22, homeY: 0.65, ampX: 0.08, ampY: 0.15, phaseX: 2.0, phaseY: 0.5 }, // green
    { color: "255, 255, 250",r: 0.35, homeX: 0.50, homeY: 0.40, ampX: 0.08, ampY: 0.18, phaseX: 1.0, phaseY: 2.5 }, // white
    { color: "255, 255, 250",r: 0.28, homeX: 0.50, homeY: 0.65, ampX: 0.09, ampY: 0.12, phaseX: 3.0, phaseY: 0.8 }, // white
    { color: "220, 20, 40",  r: 0.55, homeX: 0.85, homeY: 0.45, ampX: 0.10, ampY: 0.20, phaseX: 0.5, phaseY: 1.5 }, // red
    { color: "220, 20, 40",  r: 0.48, homeX: 0.78, homeY: 0.65, ampX: 0.08, ampY: 0.15, phaseX: 2.5, phaseY: 3.0 }, // red
  ];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function draw(timestamp) {
    var w = canvas.width;
    var h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Dark base fill
    ctx.fillStyle = "#0a1a0f";
    ctx.fillRect(0, 0, w, h);

    // Draw each fog blob
    blobs.forEach(function (b) {
      // Oscillate around home position — never leaves its zone
      var cx = (b.homeX + Math.sin(timestamp * 0.0007 + b.phaseX) * b.ampX) * w;
      var cy = (b.homeY + Math.cos(timestamp * 0.0005 + b.phaseY) * b.ampY) * h;
      var radius = b.r * Math.max(w, h);

      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      var isWhite = b.color === "255, 255, 250";
      grad.addColorStop(0,   "rgba(" + b.color + ", " + (isWhite ? 0.90 : 0.50) + ")");
      grad.addColorStop(0.4, "rgba(" + b.color + ", " + (isWhite ? 0.55 : 0.25) + ")");
      grad.addColorStop(1,   "rgba(" + b.color + ", 0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  requestAnimationFrame(draw);
})();
