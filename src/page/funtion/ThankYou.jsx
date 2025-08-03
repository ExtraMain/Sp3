import React, { useState, useEffect, useRef } from 'react';

const EnhancedThankYou = () => {
  const canvasRef = useRef(null);
  const messageRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [showHearts, setShowHearts] = useState(true);
  const [orderInfo] = useState({
    deliveryDate: (() => {
      const today = new Date();
      const startDate = new Date(today);
      const endDate = new Date(today);
      startDate.setDate(today.getDate() + 4);
      endDate.setDate(today.getDate() + 5);
      return `từ ngày ${startDate.getDate()}/${startDate.getMonth() + 1} đến ngày ${endDate.getDate() + 1}/${endDate.getMonth() + 1}`;
    })()
  });

  // Ẩn header/footer khi component mount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const elementsToHide = [
      'header', 'nav', 'footer', '.header', '.footer', '.navbar', 
      '#header', '#footer', '#navbar'
    ];

    const hiddenElements = [];
    
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (el && el.style.display !== 'none') {
          hiddenElements.push({
            element: el,
            originalDisplay: el.style.display
          });
          el.style.display = 'none';
        }
      });
    });

    return () => {
      document.body.style.overflow = 'auto';
      hiddenElements.forEach(({ element, originalDisplay }) => {
        element.style.display = originalDisplay;
      });
    };
  }, []);

  useEffect(() => {
    if (!showHearts) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    const isDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      (navigator.userAgent || navigator.vendor || window.opera || '').toLowerCase()
    );
    
    const mobile = isDevice;
    const koef = mobile ? 0.5 : 1;
    
    // Color palette
    const colors = ['#7f5539', '#a68a64', '#ede0d4', '#656d4a', '#414833'];
    
    const updateCanvasSize = () => {
      canvas.width = koef * window.innerWidth;
      canvas.height = koef * window.innerHeight;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      return { width: canvas.width, height: canvas.height };
    };
    
    let { width, height } = updateCanvasSize();
    
    const createBackground = () => {
      // Gradient background
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height));
      gradient.addColorStop(0, '#ede0d4');
      gradient.addColorStop(0.7, '#a68a64');
      gradient.addColorStop(1, '#7f5539');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };
    
    createBackground();
    
    // Enhanced heart shape with more curves
    const heartPosition = (rad, size = 1) => {
      const x = Math.pow(Math.sin(rad), 3);
      const y = -(15 * Math.cos(rad) - 5 * Math.cos(2 * rad) - 2 * Math.cos(3 * rad) - Math.cos(4 * rad));
      return [x * size, y * size];
    };
    
    const scaleAndTranslate = (pos, sx, sy, dx, dy) => {
      return [dx + pos[0] * sx, dy + pos[1] * sy];
    };
    
    const handleResize = () => {
      const dims = updateCanvasSize();
      width = dims.width;
      height = dims.height;
      createBackground();
    };
    
    window.addEventListener('resize', handleResize);
    
    const traceCount = mobile ? 15 : 40;
    const pointsOrigin = [];
    const dr = mobile ? 0.2 : 0.08;
    
    const heartScale = mobile ? 1 : 1.5;
    
    // Multiple heart layers with different sizes and rotations
    for (let layer = 0; layer < 4; layer++) {
      const layerScale = (4 - layer) * 0.3 * heartScale;
      const rotation = layer * 0.1;
      
      for (let i = 0; i < Math.PI * 2; i += dr) {
        const pos = heartPosition(i);
        const rotatedX = pos[0] * Math.cos(rotation) - pos[1] * Math.sin(rotation);
        const rotatedY = pos[0] * Math.sin(rotation) + pos[1] * Math.cos(rotation);
        pointsOrigin.push(scaleAndTranslate([rotatedX, rotatedY], 200 * layerScale, 15 * layerScale, 0, 0));
      }
    }
    
    const heartPointsCount = pointsOrigin.length;
    const targetPoints = [];
    
    const pulse = (kx, ky, time) => {
      const breathe = 0.8 + 0.3 * Math.sin(time * 0.8);
      for (let i = 0; i < pointsOrigin.length; i++) {
        const noise = 0.1 * Math.sin(time * 2 + i * 0.1);
        targetPoints[i] = [];
        targetPoints[i][0] = (kx * breathe + noise) * pointsOrigin[i][0] + width / 2;
        targetPoints[i][1] = (ky * breathe + noise) * pointsOrigin[i][1] + height / 2;
      }
    };
    
    const particles = [];
    const sparkles = [];
    const rand = Math.random;
    
    // Initialize particles with enhanced properties
    for (let i = 0; i < heartPointsCount; i++) {
      const x = rand() * width;
      const y = rand() * height;
      const colorIndex = Math.floor(rand() * colors.length);
      
      particles[i] = {
        vx: 0,
        vy: 0,
        R: 1 + rand() * 2,
        speed: rand() * 3 + 2,
        q: Math.floor(rand() * heartPointsCount),
        D: 2 * (i % 2) - 1,
        force: 0.1 * rand() + 0.85,
        baseColor: colors[colorIndex],
        alpha: 0.6 + rand() * 0.4,
        pulsePhase: rand() * Math.PI * 2,
        trace: [],
        age: 0
      };
      
      for (let k = 0; k < traceCount; k++) {
        particles[i].trace[k] = { x, y, alpha: 1 - k / traceCount };
      }
    }
    
    // Add sparkle effects
    for (let i = 0; i < 20; i++) {
      sparkles.push({
        x: rand() * width,
        y: rand() * height,
        size: rand() * 3 + 1,
        speed: rand() * 0.5 + 0.2,
        angle: rand() * Math.PI * 2,
        life: rand() * 100 + 50,
        maxLife: rand() * 100 + 50,
        color: colors[Math.floor(rand() * colors.length)]
      });
    }
    
    const config = {
      traceK: 0.3,
      timeDelta: 0.008
    };
    
    let time = 0;
    let animationFrameId;
    
    const loop = () => {
      if (!showHearts) return;
      
      const n = -Math.cos(time);
      const heartbeat = Math.abs(Math.sin(time * 3)) * 0.3 + 0.7;
      pulse((1 + n) * heartbeat, (1 + n) * heartbeat, time);
      
      time += ((Math.sin(time * 0.5)) < 0 ? 12 : (n > 0.8) ? 0.3 : 1.5) * config.timeDelta;
      
      // Create animated background
      const gradient = ctx.createRadialGradient(
        width/2 + 50 * Math.sin(time * 0.3), 
        height/2 + 30 * Math.cos(time * 0.4), 
        0, 
        width/2, height/2, 
        Math.max(width, height)
      );
      gradient.addColorStop(0, '#ede0d4');
      gradient.addColorStop(0.3, 'rgba(237, 224, 212, 0.9)');
      gradient.addColorStop(0.7, 'rgba(166, 138, 100, 0.8)');
      gradient.addColorStop(1, '#7f5539');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      
      // Update and draw sparkles
      sparkles.forEach(sparkle => {
        sparkle.x += Math.cos(sparkle.angle) * sparkle.speed;
        sparkle.y += Math.sin(sparkle.angle) * sparkle.speed;
        sparkle.life--;
        
        if (sparkle.life <= 0) {
          sparkle.x = rand() * width;
          sparkle.y = rand() * height;
          sparkle.life = sparkle.maxLife;
          sparkle.angle = rand() * Math.PI * 2;
        }
        
        const alpha = sparkle.life / sparkle.maxLife;
        ctx.save();
        ctx.translate(sparkle.x, sparkle.y);
        ctx.rotate(time * 2);
        ctx.fillStyle = sparkle.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillRect(-sparkle.size/2, -sparkle.size/2, sparkle.size, sparkle.size);
        ctx.restore();
      });
      
      // Update and draw heart particles
      for (let i = particles.length; i--;) {
        const u = particles[i];
        const q = targetPoints[u.q];
        const dx = u.trace[0].x - q[0];
        const dy = u.trace[0].y - q[1];
        const length = Math.sqrt(dx * dx + dy * dy);
        
        u.age++;
        
        if (10 > length) {
          if (0.96 < rand()) {
            u.q = Math.floor(rand() * heartPointsCount);
          } else {
            if (0.98 < rand()) {
              u.D *= -1;
            }
            u.q += u.D;
            u.q %= heartPointsCount;
            if (0 > u.q) {
              u.q += heartPointsCount;
            }
          }
        }
        
        u.vx += -dx / length * u.speed;
        u.vy += -dy / length * u.speed;
        u.trace[0].x += u.vx;
        u.trace[0].y += u.vy;
        u.vx *= u.force;
        u.vy *= u.force;
        
        for (let k = 0; k < u.trace.length - 1;) {
          const T = u.trace[k];
          const N = u.trace[++k];
          N.x -= config.traceK * (N.x - T.x);
          N.y -= config.traceK * (N.y - T.y);
        }
        
        // Enhanced particle rendering with glow effect
        const pulseAlpha = u.alpha * (0.7 + 0.3 * Math.sin(time * 4 + u.pulsePhase));
        
        for (let k = 0; k < u.trace.length; k++) {
          const traceAlpha = (1 - k / u.trace.length) * pulseAlpha;
          const size = u.R * (1 - k / u.trace.length * 0.5);
          
          // Glow effect
          ctx.shadowColor = u.baseColor;
          ctx.shadowBlur = size * 2;
          ctx.fillStyle = u.baseColor + Math.floor(traceAlpha * 255).toString(16).padStart(2, '0');
          
          ctx.beginPath();
          ctx.arc(u.trace[k].x, u.trace[k].y, size, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.shadowBlur = 0;
        }
      }
      
      // Add central glow effect
      const centerGlow = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 150);
      centerGlow.addColorStop(0, 'rgba(237, 224, 212, 0.3)');
      centerGlow.addColorStop(1, 'rgba(237, 224, 212, 0)');
      ctx.fillStyle = centerGlow;
      ctx.fillRect(width/2 - 150, height/2 - 150, 300, 300);
      
      animationFrameId = window.requestAnimationFrame(loop);
    };
    
    loop();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [showHearts]);

  const handleHeartClick = () => {
    setShowHearts(false);
    setShowMessage(true);
    
    setTimeout(() => {
      if (messageRef.current) {
        messageRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  const handleCloseMessage = () => {
    setShowMessage(false);
    setShowHearts(true);
  };

  return (
    <>
      <style>{`
        .thank-you-container {
          animation: float 6s ease-in-out infinite, popIn 0.8s ease-out;
          box-shadow: 
            0 15px 35px rgba(127, 85, 57, 0.4),
            0 5px 15px rgba(127, 85, 57, 0.2),
            0 0 30px rgba(237, 224, 212, 0.3) inset;
          background: linear-gradient(135deg, 
            rgba(237, 224, 212, 0.95) 0%, 
            rgba(166, 138, 100, 0.9) 100%);
          border: 2px solid rgba(127, 85, 57, 0.3);
        }
        
        @keyframes popIn {
          0% { transform: scale(0.2) rotate(-5deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(2deg); opacity: 0.8; }
          70% { transform: scale(0.95) rotate(-1deg); opacity: 0.9; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-0.5deg); }
        }
        
        .pop-up-text {
          animation: popUp 1.2s forwards;
          opacity: 0;
          transform: scale(0.8);
          text-shadow: 2px 2px 8px rgba(127, 85, 57, 0.3);
        }
        
        @keyframes popUp {
          0% { opacity: 0; transform: scale(0.8) translateY(10px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .bounce-in-button {
          animation: bounceIn 1.8s 1.2s forwards;
          opacity: 0;
          transform: scale(0.3);
        }
        
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.3) translateY(30px); }
          50% { opacity: 0.8; transform: scale(1.1) translateY(-10px); }
          70% { transform: scale(0.9) translateY(3px); }
          85% { transform: scale(1.02) translateY(-2px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        .gradient-text {
          background: linear-gradient(45deg, #7f5539, #656d4a, #414833);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-button {
          background: linear-gradient(45deg, #7f5539, #656d4a);
          transition: all 0.3s ease;
        }
        
        .gradient-button:hover {
          background: linear-gradient(45deg, #656d4a, #414833);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(127, 85, 57, 0.4);
        }

        .fullscreen-overlay {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          z-index: 9999 !important;
        }
        
        .click-instruction {
          animation: bounce 2s infinite, glow 3s ease-in-out infinite alternate;
          text-shadow: 0 0 10px rgba(237, 224, 212, 0.8);
        }
        
        @keyframes glow {
          from { text-shadow: 0 0 5px rgba(237, 224, 212, 0.5), 0 0 10px rgba(127, 85, 57, 0.3); }
          to { text-shadow: 0 0 15px rgba(237, 224, 212, 0.8), 0 0 25px rgba(127, 85, 57, 0.5); }
        }
      `}</style>
      
      <div className="fullscreen-overlay">
        {showHearts && (
          <div className="absolute inset-0 cursor-pointer" onClick={handleHeartClick}>
            <canvas 
              ref={canvasRef} 
              className="absolute left-0 top-0 w-full h-full"
              style={{ 
                zIndex: 1
              }}
            />
            
            {/* Enhanced instruction */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
              <div className="click-instruction text-white text-xl font-bold mb-2 px-6 py-3 rounded-full" 
                   style={{backgroundColor: 'rgba(127, 85, 57, 0.8)', backdropFilter: 'blur(10px)'}}>
                💝 Nhấn vào trái tim để xem thông báo
              </div>
            </div>
          </div>
        )}
        
        <div 
          ref={messageRef}
          className={`absolute inset-0 transition-all duration-700
                     ${showMessage ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
          style={{ 
            background: 'linear-gradient(135deg, #ede0d4 0%, #a68a64 100%)'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="thank-you-container rounded-3xl shadow-2xl p-10 max-w-lg mx-4 text-center relative">
              <button 
                className="absolute top-6 right-6 text-opacity-60 hover:text-opacity-100 focus:outline-none transition-all z-10 w-8 h-8 rounded-full flex items-center justify-center"
                style={{color: '#7f5539', backgroundColor: 'rgba(127, 85, 57, 0.1)'}}
                onClick={handleCloseMessage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-6xl mb-8">🎉</div>
              
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-8 pop-up-text">
                Cảm ơn bạn đã sử dụng dịch vụ!
              </h1>
              
              <div className="mt-8 bounce-in-button">
                <a 
                  href="/AllDichvu" 
                  className="inline-block px-10 py-4 rounded-full gradient-button text-white font-bold text-xl shadow-lg transition-all duration-300"
                >
                  Tiếp tục khám phá
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedThankYou;