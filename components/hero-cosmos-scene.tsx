"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type FeaturePoint = {
  accent?: boolean;
  anchor: [number, number, number];
  label: string;
  tooltip: [number, number, number];
};

const featurePoints: FeaturePoint[] = [
  {
    accent: true,
    anchor: [0.42, 2, 0.74],
    label: "Experiență reală + Integrare AI",
    tooltip: [0.18, 1.2, 1.18],
  },
  {
    anchor: [1.95, 0.52, 0.7],
    label: "Panoul Admin Personalizat",
    tooltip: [0.38, 0.96, 1.1],
  },
  {
    accent: true,
    anchor: [1.44, -1.28, 1.12],
    label: "Tu poți decide design-ul",
    tooltip: [0.34, 0.72, 1.32],
  },
  {
    anchor: [1.16, 1.78, 0.52],
    label: "100% SEO",
    tooltip: [0.1, 1.05, 1],
  },
  {
    anchor: [0.9, -1.9, 0.84],
    label: "Mentenanță avantajoasă",
    tooltip: [0.56, 0.76, 1.08],
  },
  {
    anchor: [1.7, 1.24, 0.8],
    label: "Optimizare pentru mobil",
    tooltip: [0.66, 1.24, 1.16],
  },
  {
    anchor: [2.1, 0.32, -0.4],
    label: "Viteză și performanță",
    tooltip: [0.78, 0.86, 0.96],
  },
  {
    anchor: [0.34, -1.78, 1.2],
    label: "Scalabil de la început",
    tooltip: [0.5, 0.68, 1.22],
  },
  {
    anchor: [0.18, 1.92, -0.76],
    label: "Consultanță inclusă",
    tooltip: [0.3, 1.14, 0.74],
  },
  {
    anchor: [1.08, -0.38, -1.9],
    label: "Structură clară",
    tooltip: [0.92, 0.78, 0.62],
  },
  {
    anchor: [-1.44, 0.92, 1.28],
    label: "Identitate vizuală",
    tooltip: [0.14, 0.98, 1.28],
  },
  {
    anchor: [-1.92, -0.42, -0.92],
    label: "Conținut bine organizat",
    tooltip: [0.62, 0.7, 0.68],
  },
];

function createStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(116,211,255,0.72)");
  gradient.addColorStop(1, "rgba(116,211,255,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTooltipTexture(text: string, accent = false) {
  const pixelRatio = Math.min(window.devicePixelRatio * 2, 4);
  const fontSize = accent ? 20 : 19;
  const horizontalPadding = 13;
  const verticalPadding = 8;
  const markerSize = 6;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  context.font = `800 ${fontSize}px Arial, Helvetica, sans-serif`;
  const metrics = context.measureText(text);
  const width = Math.ceil(metrics.width + horizontalPadding * 2 + markerSize + 10);
  const height = Math.ceil(fontSize + verticalPadding * 2);

  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  context.scale(pixelRatio, pixelRatio);

  const accentColor = accent ? "#ff8058" : "#72e7ff";
  const accentGlow = accent ? "rgba(255, 128, 88, 0.58)" : "rgba(114, 231, 255, 0.5)";
  const panelGradient = context.createLinearGradient(0, 0, width, height);
  panelGradient.addColorStop(0, accent ? "rgba(72, 26, 20, 0.9)" : "rgba(4, 14, 34, 0.9)");
  panelGradient.addColorStop(0.5, "rgba(11, 26, 52, 0.82)");
  panelGradient.addColorStop(1, "rgba(4, 9, 22, 0.72)");

  context.shadowColor = accentGlow;
  context.shadowBlur = 20;
  context.fillStyle = panelGradient;
  context.strokeStyle = accent ? "rgba(255, 150, 112, 0.72)" : "rgba(132, 236, 255, 0.62)";
  context.lineWidth = 1.2;
  context.beginPath();
  context.roundRect(1, 1, width - 2, height - 2, 12);
  context.fill();
  context.stroke();

  context.shadowBlur = 14;
  context.strokeStyle = accentGlow;
  context.beginPath();
  context.moveTo(15, height - 1.5);
  context.lineTo(width * 0.34, height - 1.5);
  context.stroke();

  context.shadowBlur = 8;
  context.fillStyle = accentColor;
  context.beginPath();
  context.arc(horizontalPadding - 8, height / 2, markerSize / 2, 0, Math.PI * 2);
  context.fill();

  context.shadowBlur = 0;
  context.fillStyle = "rgba(255,255,255,0.78)";
  context.beginPath();
  context.arc(horizontalPadding - 8, height / 2, markerSize / 4, 0, Math.PI * 2);
  context.fill();

  context.fillStyle = "#f8fdff";
  context.textBaseline = "middle";
  context.font = `800 ${fontSize}px Arial, Helvetica, sans-serif`;
  context.fillText(text, horizontalPadding + markerSize + 8, height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return { texture, width, height };
}

function createOrbit(radius: number, color: string, opacity: number, tilt: [number, number, number]) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(192).map((point) => new THREE.Vector3(point.x, point.y, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  });
  const line = new THREE.LineLoop(geometry, material);
  line.rotation.set(...tilt);
  return line;
}

function createArc(radius: number, start: number, end: number, color: string) {
  const points: THREE.Vector3[] = [];
  const steps = 72;

  for (let index = 0; index <= steps; index++) {
    const progress = index / steps;
    const angle = start + (end - start) * progress;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.92) * radius * 0.22,
        Math.sin(angle) * radius,
      ),
    );
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.48,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Line(geometry, material);
}

export function HeroCosmosScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b1d, 0.045);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });

    renderer.setClearColor(0x020817, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const sphereGroup = new THREE.Group();
    root.add(sphereGroup);

    const globeCoreGroup = new THREE.Group();
    sphereGroup.add(globeCoreGroup);

    const globeGeometry = new THREE.SphereGeometry(2.25, 48, 32);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x35b8ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    globeCoreGroup.add(new THREE.Mesh(globeGeometry, wireMaterial));

    const glowGeometry = new THREE.SphereGeometry(2.34, 64, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x194bff,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    globeCoreGroup.add(new THREE.Mesh(glowGeometry, glowMaterial));

    const rim = createOrbit(2.42, "#49d9ff", 0.58, [Math.PI / 2.08, 0.06, -0.1]);
    globeCoreGroup.add(rim);

    const orbits = [
      createOrbit(2.26, "#46caff", 0.24, [Math.PI / 2, 0, 0]),
      createOrbit(2.26, "#7a8cff", 0.18, [Math.PI / 2, Math.PI / 3, 0]),
      createOrbit(2.26, "#46caff", 0.18, [Math.PI / 2, -Math.PI / 3, 0]),
      createOrbit(2.26, "#7a8cff", 0.16, [0.25, Math.PI / 2, 0.3]),
    ];
    orbits.forEach((orbit) => globeCoreGroup.add(orbit));

    const arcs = [
      createArc(2.75, -0.8, 1.4, "#52e3ff"),
      createArc(2.96, 1.9, 3.9, "#7a7cff"),
      createArc(2.58, 3.4, 5.4, "#37bdff"),
    ];
    arcs.forEach((arc) => globeCoreGroup.add(arc));

    const baseNodeGeometry = new THREE.SphereGeometry(0.045, 12, 12);
    const baseNodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x96ecff,
      transparent: true,
      opacity: 0.72,
      blending: THREE.AdditiveBlending,
    });

    [
      [1.7, 1.24, 0.8],
      [-1.44, 0.92, 1.28],
      [0.34, -1.78, 1.2],
      [1.08, -0.38, -1.9],
      [-1.92, -0.42, -0.92],
      [0.18, 1.92, -0.76],
      [2.1, 0.32, -0.4],
    ].forEach(([x, y, z]) => {
      const node = new THREE.Mesh(baseNodeGeometry, baseNodeMaterial);
      node.position.set(x, y, z);
      globeCoreGroup.add(node);
    });

    const featureNodeGeometry = new THREE.SphereGeometry(0.058, 16, 16);
    const featureHaloGeometry = new THREE.SphereGeometry(0.18, 20, 20);
    const featureNodes = featurePoints.map((point) => {
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: point.accent ? 0xff8058 : 0x9ff3ff,
        transparent: true,
        opacity: 0.68,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const haloMaterial = new THREE.MeshBasicMaterial({
        color: point.accent ? 0xff7048 : 0x53dfff,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const node = new THREE.Mesh(featureNodeGeometry, nodeMaterial);
      const halo = new THREE.Mesh(featureHaloGeometry, haloMaterial);
      node.position.set(...point.anchor);
      halo.position.set(...point.anchor);
      sphereGroup.add(node);
      sphereGroup.add(halo);
      return { halo, haloMaterial, node, nodeMaterial };
    });

    const initialTooltipTexture = createTooltipTexture(featurePoints[0].label, true);
    const tooltipMaterial = new THREE.SpriteMaterial({
      map: initialTooltipTexture?.texture,
      transparent: true,
      opacity: 0,
      depthTest: false,
      depthWrite: false,
    });
    const tooltipSprite = new THREE.Sprite(tooltipMaterial);
    const tooltipScale = 0.0038;
    if (initialTooltipTexture) {
      tooltipSprite.scale.set(
        initialTooltipTexture.width * tooltipScale,
        initialTooltipTexture.height * tooltipScale,
        1,
      );
    }
    tooltipSprite.renderOrder = 5;
    sphereGroup.add(tooltipSprite);

    const connectorGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(...featurePoints[0].anchor),
      new THREE.Vector3(...featurePoints[0].tooltip),
    ]);
    const connectorMaterial = new THREE.LineBasicMaterial({
      color: 0x72e7ff,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const connectorLine = new THREE.Line(connectorGeometry, connectorMaterial);
    sphereGroup.add(connectorLine);

    const tooltipTextures = initialTooltipTexture ? [initialTooltipTexture.texture] : [];
    let activeTooltipIndex = -1;
    let viewportWidth = 0;
    let viewportHeight = 0;
    let labelsVisible = false;

    const tooltipWorldPosition = new THREE.Vector3();
    const tooltipCameraPosition = new THREE.Vector3();
    const tooltipScreenPosition = new THREE.Vector3();
    const sphereWorldScale = new THREE.Vector3();

    const setActiveTooltip = (index: number) => {
      if (activeTooltipIndex === index) {
        return;
      }

      const point = featurePoints[index];
      const textureResult = createTooltipTexture(point.label, Boolean(point.accent));

      if (!textureResult) {
        return;
      }

      tooltipTextures.push(textureResult.texture);
      tooltipMaterial.map = textureResult.texture;
      tooltipMaterial.needsUpdate = true;
      tooltipSprite.scale.set(
        textureResult.width * tooltipScale,
        textureResult.height * tooltipScale,
        1,
      );
      activeTooltipIndex = index;
    };

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 520;
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index++) {
      const offset = index * 3;
      starPositions[offset] = (Math.random() - 0.5) * 18;
      starPositions[offset + 1] = (Math.random() - 0.5) * 10;
      starPositions[offset + 2] = -Math.random() * 9 - 1;

      const tint = Math.random();
      starColors[offset] = 0.42 + tint * 0.5;
      starColors[offset + 1] = 0.62 + tint * 0.35;
      starColors[offset + 2] = 1;
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starsGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      map: createStarTexture() ?? undefined,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const dustGeometry = new THREE.BufferGeometry();
    const dustCount = 120;
    const dustPositions = new Float32Array(dustCount * 3);

    for (let index = 0; index < dustCount; index++) {
      const offset = index * 3;
      dustPositions[offset] = (Math.random() - 0.5) * 14;
      dustPositions[offset + 1] = (Math.random() - 0.5) * 8;
      dustPositions[offset + 2] = -Math.random() * 7 - 1.5;
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0x315dff,
      size: 0.11,
      transparent: true,
      opacity: 0.12,
      map: createStarTexture() ?? undefined,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    const keyLight = new THREE.PointLight(0x5bdcff, 2.2, 9);
    keyLight.position.set(2, 2, 3);
    scene.add(keyLight);

    const sphereBasePosition = new THREE.Vector3();
    let sphereBaseScale = 1;

    const setLineOpacity = (line: THREE.Line | THREE.LineLoop, opacity: number) => {
      const material = line.material;

      if (Array.isArray(material)) {
        material.forEach((item) => {
          item.opacity = opacity;
        });
        return;
      }

      material.opacity = opacity;
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      const isMobile = width < 768;

      viewportWidth = width;
      viewportHeight = height;
      labelsVisible = width >= 1180;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.set(0, 0, isMobile ? 8.1 : 7.1);
      camera.updateProjectionMatrix();

      sphereBasePosition.set(isMobile ? 2.05 : 2.28, isMobile ? -0.36 : 0.00, -0.75);
      sphereBaseScale = isMobile ? 1.05 : 1.2;
      sphereGroup.position.copy(sphereBasePosition);
      sphereGroup.scale.setScalar(sphereBaseScale);
      root.rotation.set(isMobile ? -0.05 : 0, isMobile ? -0.12 : 0, 0);
      tooltipSprite.visible = labelsVisible;
      connectorLine.visible = labelsVisible;
    };

    const constrainTooltipToSafeArea = () => {
      if (!labelsVisible || viewportWidth <= 0 || viewportHeight <= 0) {
        return;
      }

      sphereGroup.updateMatrixWorld(true);
      tooltipSprite.getWorldPosition(tooltipWorldPosition);
      tooltipCameraPosition.copy(tooltipWorldPosition).applyMatrix4(camera.matrixWorldInverse);
      tooltipScreenPosition.copy(tooltipWorldPosition).project(camera);

      const distance = Math.max(0.1, -tooltipCameraPosition.z);
      const pixelsPerWorldUnit = viewportHeight /
        (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance);
      sphereGroup.getWorldScale(sphereWorldScale);
      const halfTooltipWidth = tooltipSprite.scale.x * sphereWorldScale.x * pixelsPerWorldUnit * 0.5;
      const halfTooltipHeight = tooltipSprite.scale.y * sphereWorldScale.y * pixelsPerWorldUnit * 0.5;

      const currentX = (tooltipScreenPosition.x * 0.5 + 0.5) * viewportWidth;
      const currentY = (-tooltipScreenPosition.y * 0.5 + 0.5) * viewportHeight;
      const safeLeft = Math.max(viewportWidth * 0.62 + halfTooltipWidth, halfTooltipWidth + 20);
      const safeRight = Math.max(safeLeft, viewportWidth - halfTooltipWidth - 20);
      const safeTop = halfTooltipHeight + 28;
      const safeBottom = viewportHeight - halfTooltipHeight - 28;
      const clampedX = THREE.MathUtils.clamp(currentX, safeLeft, safeRight);
      const clampedY = THREE.MathUtils.clamp(currentY, safeTop, safeBottom);

      if (clampedX === currentX && clampedY === currentY) {
        return;
      }

      tooltipScreenPosition.x = (clampedX / viewportWidth) * 2 - 1;
      tooltipScreenPosition.y = -(clampedY / viewportHeight) * 2 + 1;
      tooltipScreenPosition.unproject(camera);
      sphereGroup.worldToLocal(tooltipScreenPosition);
      tooltipSprite.position.copy(tooltipScreenPosition);
    };

    let pointerX = 0;
    let pointerY = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.28;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    mount.addEventListener("pointermove", handlePointerMove);
    resize();

    let animationFrame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const activeIndex = Math.floor(elapsed / 2.6) % featurePoints.length;
      const activePoint = featurePoints[activeIndex];
      const cycleProgress = (elapsed % 2.6) / 2.6;
      const fade = Math.min(1, cycleProgress * 5, (1 - cycleProgress) * 5);
      const pulse = 0.75 + Math.sin(elapsed * 3) * 0.25;
      const intro = THREE.MathUtils.smoothstep(elapsed, 0, 1.45);
      const labelIntro = THREE.MathUtils.smoothstep(elapsed, 0.65, 1.75);

      setActiveTooltip(activeIndex);

      sphereGroup.position.set(
        sphereBasePosition.x + (1 - intro) * 0.42,
        sphereBasePosition.y - (1 - intro) * 0.12,
        sphereBasePosition.z,
      );
      sphereGroup.scale.setScalar(sphereBaseScale * (0.9 + intro * 0.1));
      sphereGroup.rotation.x = Math.sin(elapsed * 0.28) * 0.025 + pointerY;
      globeCoreGroup.rotation.y = elapsed * 0.16 + pointerX;
      globeCoreGroup.rotation.x = Math.sin(elapsed * 0.28) * 0.04;
      wireMaterial.opacity = 0.22 * intro;
      glowMaterial.opacity = 0.08 * intro;
      setLineOpacity(rim, 0.58 * intro);
      orbits.forEach((orbit, index) => {
        setLineOpacity(orbit, [0.24, 0.18, 0.18, 0.16][index] * intro);
      });
      arcs.forEach((arc, index) => {
        arc.rotation.y = elapsed * (0.08 + index * 0.015);
        setLineOpacity(arc, 0.48 * intro);
      });

      const anchor = new THREE.Vector3(...activePoint.anchor);
      const tooltip = new THREE.Vector3(...activePoint.tooltip);
      tooltipSprite.position.copy(tooltip);
      tooltipSprite.position.y += Math.sin(elapsed * 1.2) * 0.035;
      tooltipSprite.position.y = Math.min(tooltipSprite.position.y, 1.28);
      constrainTooltipToSafeArea();
      tooltipMaterial.opacity = labelIntro * (fade < 0.2 ? fade * 4.8 : 0.96);

      const connectorPositions = connectorGeometry.attributes.position as THREE.BufferAttribute;
      connectorPositions.setXYZ(0, anchor.x, anchor.y, anchor.z);
      connectorPositions.setXYZ(1, tooltipSprite.position.x, tooltipSprite.position.y, tooltipSprite.position.z);
      connectorPositions.needsUpdate = true;
      connectorMaterial.opacity = labelIntro * fade * 0.42;
      connectorMaterial.color.set(activePoint.accent ? 0xff8058 : 0x72e7ff);

      featureNodes.forEach((featureNode, index) => {
        const isActive = index === activeIndex;
        const nodeIntro = THREE.MathUtils.smoothstep(elapsed, 0.28 + index * 0.035, 1.1 + index * 0.035);
        featureNode.nodeMaterial.opacity = nodeIntro * (isActive ? 0.86 + pulse * 0.14 : 0.42);
        featureNode.haloMaterial.opacity = nodeIntro * (isActive ? 0.18 + pulse * 0.16 : 0.06);
        featureNode.halo.scale.setScalar(nodeIntro * (isActive ? 1.2 + pulse * 0.28 : 0.82));
      });

      stars.rotation.y = elapsed * 0.006;
      dust.rotation.y = -elapsed * 0.012;
      starsMaterial.opacity = intro * 0.72;
      dustMaterial.opacity = intro * (0.1 + Math.sin(elapsed * 0.8) * 0.025);

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeChild(renderer.domElement);

      [
        globeGeometry,
        glowGeometry,
        rim.geometry,
        baseNodeGeometry,
        featureNodeGeometry,
        featureHaloGeometry,
        connectorGeometry,
        starsGeometry,
        dustGeometry,
        ...orbits.map((orbit) => orbit.geometry),
        ...arcs.map((arc) => arc.geometry),
      ].forEach((geometry) => geometry.dispose());

      [
        wireMaterial,
        glowMaterial,
        rim.material,
        baseNodeMaterial,
        connectorMaterial,
        tooltipMaterial,
        starsMaterial,
        dustMaterial,
        ...featureNodes.map((featureNode) => featureNode.nodeMaterial),
        ...featureNodes.map((featureNode) => featureNode.haloMaterial),
        ...orbits.map((orbit) => orbit.material),
        ...arcs.map((arc) => arc.material),
      ].forEach((material) => {
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else {
          material.dispose();
        }
      });

      tooltipTextures.forEach((texture) => texture.dispose());
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-20" aria-hidden="true" />;
}
