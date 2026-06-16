import { WelcomeBeachKangaroo } from './WelcomeBeachKangaroo'
import { YachtPaths, yachtTransform } from './YachtArt'

export function CoastalTownBackground() {
  const yacht = yachtTransform(710, 412, 0.48)

  return (
    <div className="welcome-scene" aria-hidden="true">
      <svg
        className="welcome-scene-svg"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="welcome-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5EB3F6" />
            <stop offset="45%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#C8E6F5" />
          </linearGradient>
          <linearGradient id="welcome-ocean-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5BC4BE" />
            <stop offset="100%" stopColor="#3AAFA9" />
          </linearGradient>
          <linearGradient id="welcome-ocean-near" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38B2AC" />
            <stop offset="60%" stopColor="#1A9A94" />
            <stop offset="100%" stopColor="#0E6B66" />
          </linearGradient>
          <linearGradient id="welcome-sand" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F0D78C" />
            <stop offset="100%" stopColor="#D4B56A" />
          </linearGradient>
          <linearGradient id="welcome-cliff" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4956A" />
            <stop offset="100%" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="welcome-hill-far" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8FB996" />
            <stop offset="100%" stopColor="#6A9478" />
          </linearGradient>
          <linearGradient id="welcome-hill-mid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DAF88" />
            <stop offset="100%" stopColor="#4E8059" />
          </linearGradient>
          <filter id="welcome-haze">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          <radialGradient id="welcome-vignette" cx="50%" cy="60%" r="65%">
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="#1a3a4a" />
          </radialGradient>
        </defs>

        {/* Sky */}
        <rect width="1200" height="700" fill="url(#welcome-sky)" />

        {/* Clouds */}
        <g className="welcome-cloud welcome-cloud-1" opacity="0.88">
          <ellipse cx="140" cy="75" rx="65" ry="24" fill="white" />
          <ellipse cx="190" cy="68" rx="48" ry="20" fill="white" />
        </g>
        <g className="welcome-cloud welcome-cloud-2" opacity="0.82">
          <ellipse cx="620" cy="55" rx="75" ry="26" fill="white" />
          <ellipse cx="680" cy="48" rx="50" ry="22" fill="white" />
        </g>
        <g className="welcome-cloud welcome-cloud-3" opacity="0.7">
          <ellipse cx="1020" cy="95" rx="55" ry="20" fill="white" />
        </g>

        {/* Sun haze */}
        <circle cx="1040" cy="85" r="48" fill="#FFD93D" opacity="0.95" />
        <circle cx="1040" cy="85" r="70" fill="#FFD93D" opacity="0.18" />

        {/* Far ocean / bay base */}
        <rect x="0" y="295" width="1200" height="405" fill="url(#welcome-ocean-far)" />

        {/* Distant headlands across the bay */}
        <path
          d="M 0 310 Q 180 285 320 298 Q 460 312 580 292 Q 700 272 820 285 Q 940 298 1080 278 Q 1140 270 1200 288 L 1200 340 L 0 340 Z"
          fill="url(#welcome-hill-far)"
          opacity="0.75"
        />
        <path
          d="M 0 325 Q 200 305 380 318 Q 520 328 650 310 Q 780 292 900 305 Q 1020 318 1200 300 L 1200 365 L 0 365 Z"
          fill="url(#welcome-hill-mid)"
          opacity="0.55"
        />

        {/* Distant village — small cluster on far headland */}
        <g className="welcome-distant-village" transform="translate(480, 268) scale(0.42)" opacity="0.92" filter="url(#welcome-haze)">
          {/* Village pier */}
          <g transform="translate(310, 95)">
            <rect x="0" y="0" width="90" height="5" fill="#7A5C3A" />
            {[8, 28, 48, 68, 82].map((x) => (
              <rect key={x} x={x} y="5" width="3" height="14" fill="#6B4F30" />
            ))}
          </g>

          {/* Lighthouse on far point */}
          <g transform="translate(420, 40)">
            <rect x="10" y="20" width="8" height="55" fill="#E8ECEF" stroke="#AAB7B8" strokeWidth="0.8" />
            <rect x="10" y="20" width="8" height="8" fill="#C0392B" />
            <rect x="10" y="34" width="8" height="7" fill="#C0392B" />
            <rect x="10" y="47" width="8" height="7" fill="#C0392B" />
            <polygon points="8,20 14,8 20,20" fill="#C0392B" />
            <circle cx="14" cy="10" r="3" fill="#FFD93D" className="welcome-lighthouse-glow" />
          </g>

          {/* Terrace cottages stepping up the hill */}
          <g transform="translate(40, 72)">
            <rect x="0" y="18" width="38" height="28" fill="#F5F0E6" stroke="#B8A88A" strokeWidth="1" />
            <polygon points="-2,18 19,2 40,18" fill="#6E8495" />
            <rect x="10" y="28" width="8" height="18" fill="#8B7355" />
            <rect x="26" y="26" width="7" height="7" fill="#A8D4E6" stroke="#B8A88A" strokeWidth="0.6" />
          </g>

          <g transform="translate(95, 58)">
            <rect x="0" y="22" width="42" height="32" fill="#EDE4D3" stroke="#B8A88A" strokeWidth="1" />
            <polygon points="-2,22 21,4 44,22" fill="#8B9DAF" />
            <rect x="14" y="34" width="10" height="20" fill="#7A6348" />
            <rect x="28" y="30" width="8" height="8" fill="#A8D4E6" stroke="#B8A88A" strokeWidth="0.6" />
            <rect x="4" y="30" width="8" height="8" fill="#A8D4E6" stroke="#B8A88A" strokeWidth="0.6" />
          </g>

          <g transform="translate(155, 48)">
            <rect x="0" y="28" width="48" height="36" fill="#FAF6EF" stroke="#B8A88A" strokeWidth="1" />
            <polygon points="-2,28 24,6 50,28" fill="#7E8C9A" />
            <rect x="18" y="42" width="12" height="22" fill="#8B7355" />
            <rect x="34" y="38" width="9" height="9" fill="#A8D4E6" stroke="#B8A88A" strokeWidth="0.6" />
            <rect x="6" y="38" width="9" height="9" fill="#A8D4E6" stroke="#B8A88A" strokeWidth="0.6" />
          </g>

          {/* Pub / shop row */}
          <g transform="translate(215, 65)">
            <rect x="0" y="20" width="55" height="30" fill="#C0392B" stroke="#922B21" strokeWidth="1" />
            <rect x="0" y="20" width="55" height="8" fill="#7B241C" />
            <rect x="8" y="32" width="12" height="18" fill="#5D4037" />
            <rect x="34" y="30" width="14" height="10" fill="#F9E79F" stroke="#922B21" strokeWidth="0.6" />
          </g>

          <g transform="translate(278, 70)">
            <rect x="0" y="18" width="40" height="26" fill="#D5DBDB" stroke="#7F8C8D" strokeWidth="1" />
            <rect x="0" y="18" width="40" height="7" fill="#566573" />
            <rect x="14" y="28" width="12" height="16" fill="#4A3728" />
          </g>

          {/* Church steeple */}
          <g transform="translate(128, 38)">
            <rect x="8" y="30" width="28" height="38" fill="#F0EBE3" stroke="#B8A88A" strokeWidth="1" />
            <polygon points="6,30 22,8 38,30" fill="#5D6D7E" />
            <rect x="20" y="0" width="4" height="14" fill="#5D6D7E" />
            <polygon points="18,0 22,-8 26,0" fill="#5D6D7E" />
            <rect x="16" y="42" width="12" height="26" fill="#6E4C2C" />
          </g>

          {/* Lower shacks near shore */}
          <g transform="translate(60, 88)">
            <rect x="0" y="12" width="32" height="22" fill="#E8D5A3" stroke="#A08050" strokeWidth="0.8" />
            <polygon points="-1,12 16,0 33,12" fill="#A0522D" />
          </g>
          <g transform="translate(340, 82)">
            <rect x="0" y="14" width="36" height="24" fill="#D7CCC8" stroke="#A08050" strokeWidth="0.8" />
            <polygon points="-1,14 18,2 37,14" fill="#78909C" />
          </g>

          {/* Winding village path */}
          <path
            d="M 55 108 Q 120 95 180 102 Q 240 108 290 98"
            fill="none"
            stroke="#C9B896"
            strokeWidth="2.5"
            strokeDasharray="4 3"
            opacity="0.7"
          />

          {/* Gum trees around village */}
          <g transform="translate(20, 78)">
            <rect x="5" y="18" width="3" height="22" fill="#7A5230" />
            <ellipse cx="6" cy="12" rx="12" ry="16" fill="#5A8F65" opacity="0.8" />
          </g>
          <g transform="translate(370, 72)">
            <rect x="4" y="16" width="3" height="20" fill="#7A5230" />
            <ellipse cx="5" cy="10" rx="11" ry="14" fill="#5A8F65" opacity="0.8" />
          </g>
        </g>

        {/* Near ocean — deeper tone in foreground */}
        <path
          d="M 0 430 Q 200 410 400 425 Q 600 440 800 420 Q 1000 400 1200 430 L 1200 700 L 0 700 Z"
          fill="url(#welcome-ocean-near)"
        />

        {/* Yacht floating in the bay — waterline aligned to bay surface */}
        <g className="welcome-boat" opacity="0.92">
          <g transform={`translate(${yacht.x}, ${yacht.y}) scale(${yacht.scale})`}>
            <YachtPaths showWake />
          </g>
        </g>

        {/* Rugged foreground coastline */}
        <path
          d="M 0 700
             L 0 580
             Q 60 540 130 558
             Q 195 575 250 545
             Q 310 512 380 530
             Q 440 545 490 518
             Q 545 492 610 510
             Q 670 527 720 500
             Q 775 475 840 495
             Q 900 514 960 488
             Q 1020 463 1080 485
             Q 1140 505 1200 495
             L 1200 700 Z"
          fill="url(#welcome-cliff)"
        />

        {/* Grass cap on cliffs */}
        <path
          d="M 0 580
             Q 60 540 130 558
             Q 195 575 250 545
             Q 310 512 380 530
             Q 440 545 490 518
             Q 545 492 610 510
             Q 670 527 720 500
             Q 775 475 840 495
             Q 900 514 960 488
             Q 1020 463 1080 485
             Q 1140 505 1200 495
             L 1200 530 L 0 560 Z"
          fill="#5C9147"
          opacity="0.85"
        />

        {/* Sandy coves tucked into the rugged curve */}
        <path
          d="M 230 548 Q 290 535 340 552 Q 310 565 250 562 Q 230 558 230 548 Z"
          fill="url(#welcome-sand)"
        />
        <path
          d="M 680 498 Q 730 488 780 502 Q 750 518 700 515 Q 675 508 680 498 Z"
          fill="url(#welcome-sand)"
        />
        <path
          d="M 990 482 Q 1040 472 1090 488 Q 1060 505 1010 500 Q 988 492 990 482 Z"
          fill="url(#welcome-sand)"
        />

        {/* Foreground rock outcrops */}
        <g fill="#9E8060" stroke="#6B5344" strokeWidth="1">
          <path d="M 80 565 L 110 540 L 135 560 L 120 585 L 85 580 Z" />
          <path d="M 420 525 L 455 498 L 478 522 L 460 548 L 425 542 Z" />
          <path d="M 850 488 L 890 462 L 915 490 L 895 518 L 858 512 Z" />
          <path d="M 1080 478 L 1120 455 L 1150 480 L 1130 505 L 1090 498 Z" />
        </g>
        <g fill="#B8956A" opacity="0.7">
          <ellipse cx="115" cy="552" rx="18" ry="8" />
          <ellipse cx="445" cy="512" rx="16" ry="7" />
          <ellipse cx="875" cy="478" rx="20" ry="9" />
        </g>

        {/* Native grass tussocks on dunes */}
        {[
          [50, 555], [170, 538], [360, 522], [530, 505], [760, 488], [950, 475], [1120, 468],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} transform={`translate(${x}, ${y})`}>
            <path d="M 0 0 Q -4 -14 0 -22 Q 4 -14 0 0" fill="#4A7A3D" />
            <path d="M -6 2 Q -10 -8 -5 -16" fill="none" stroke="#3D6634" strokeWidth="1.5" />
            <path d="M 6 2 Q 10 -8 5 -16" fill="none" stroke="#3D6634" strokeWidth="1.5" />
          </g>
        ))}

        {/* Foreground beach detail — lower left cove */}
        <g transform="translate(240, 548)">
          <ellipse cx="40" cy="18" rx="8" ry="5" fill="#FFE4C4" stroke="#C9A87C" strokeWidth="0.5" />
          <ellipse cx="65" cy="22" rx="6" ry="4" fill="#FFEFD5" stroke="#C9A87C" strokeWidth="0.5" />
          <path d="M 20 25 L 55 25" fill="none" stroke="#C9A87C" strokeWidth="1" opacity="0.4" />
          <g transform="rotate(-12 12 20)">
            <ellipse cx="12" cy="20" rx="4" ry="14" fill="#E74C3C" stroke="#C0392B" strokeWidth="0.8" />
          </g>
        </g>

        {/* Driftwood */}
        <path
          d="M 720 508 Q 760 502 795 510 Q 770 518 730 515 Z"
          fill="#A08060"
          stroke="#6B5344"
          strokeWidth="0.8"
        />

        {/* Waves — foreground emphasis */}
        <g className="welcome-waves-svg">
          <path
            d="M 0 598 Q 120 588 240 598 Q 360 608 480 595 Q 600 582 720 598 Q 840 614 960 596 Q 1080 578 1200 592
               L 1200 615 L 0 615 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            className="welcome-wave-line"
            d="M 0 635 Q 150 622 300 635 Q 450 648 600 632 Q 750 616 900 634 Q 1050 652 1200 638"
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="3"
          />
          <path
            className="welcome-wave-line welcome-wave-line-2"
            d="M 0 668 Q 180 655 360 668 Q 540 681 720 665 Q 900 649 1200 662"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="2.5"
          />
          {/* Foam on rocks */}
          <path
            d="M 100 572 Q 115 565 130 572 Q 115 578 100 572"
            fill="rgba(255,255,255,0.35)"
          />
          <path
            d="M 430 532 Q 448 524 468 532 Q 448 540 430 532"
            fill="rgba(255,255,255,0.35)"
          />
          <path
            d="M 860 495 Q 878 487 898 495 Q 878 503 860 495"
            fill="rgba(255,255,255,0.35)"
          />
        </g>

        {/* Small kangaroo on near beach */}
        <g className="welcome-beach-roo">
          <g transform="translate(290, 555) scale(0.7)">
            <WelcomeBeachKangaroo />
          </g>
        </g>

        {/* Seagull */}
        <g className="welcome-seagull">
          <path d="M 0 0 Q 10 -5 20 0 Q 30 5 40 0" fill="none" stroke="#666" strokeWidth="1.8" />
          <path d="M 20 0 L 15 -2 M 20 0 L 25 -2" stroke="#666" strokeWidth="1.2" />
        </g>

        {/* Vignette for depth */}
        <rect width="1200" height="700" fill="url(#welcome-vignette)" opacity="0.12" />
      </svg>
    </div>
  )
}
