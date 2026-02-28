const canvas = document.getElementById('snow-canvas');
if (!canvas) {
  console.warn('snow-canvas not found');
} else {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const snowflakes = [];
  const snowChars = ['·', '*', '✶', '•', '🎄'];

  // === 参数区 ===
  const snowflakeSpawnRate = 3;   // 每次生成数量
  const snowflakeFrequency = 240; // 生成频率（越小越密）
  const maxSnowflakes = 400;      // 上限保护

  let lastTimestamp = performance.now();
  let snowflakeTimer = 0;

  function createSnowflake() {
    for (let i = 0; i < snowflakeSpawnRate; i++) {
      if (snowflakes.length >= maxSnowflakes) return;

      snowflakes.push({
        x: Math.random() * canvas.width,
        y: -10,
        speed: Math.random() * 1.2 + 0.6,
        sway: Math.random() * 2 + 0.5,
        swayPhase: Math.random() * Math.PI * 2,
        baseOpacity: Math.random() * 0.5 + 0.5,
        char: snowChars[Math.floor(Math.random() * snowChars.length)]
      });
    }
  }

  function updateSnowflakes() {
    for (let i = 0; i < snowflakes.length; i++) {
      const flake = snowflakes[i];

      flake.y += flake.speed;

      // 到屏幕底部才移除
      if (flake.y > canvas.height + 20) {
        snowflakes.splice(i, 1);
        i--;
        continue;
      }
    }
  }

  function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const style = getComputedStyle(canvas);
    ctx.font = `${style.fontSize} ${style.fontFamily}`;
    ctx.fillStyle = style.color;

    snowflakes.forEach(flake => {
      const progress = flake.y / canvas.height;
      ctx.globalAlpha = flake.baseOpacity * (1 - progress);

      const offsetX =
        Math.sin(flake.y / 25 + flake.swayPhase) * flake.sway;

      ctx.fillText(flake.char, flake.x + offsetX, flake.y);
    });

    ctx.globalAlpha = 1;
  }

  function animate(timestamp) {
    let delta = timestamp - lastTimestamp;
    if (delta > 100) delta = 100;
    lastTimestamp = timestamp;

    snowflakeTimer += delta;
    if (snowflakeTimer >= snowflakeFrequency) {
      createSnowflake();
      snowflakeTimer %= snowflakeFrequency;
    }

    updateSnowflakes();
    drawSnowflakes();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}
