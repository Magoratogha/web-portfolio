import particleTexture from '!!file-loader!../../../assets/images/particle.webp';
import {
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
  isDevMode,
} from '@angular/core';
import gsap from 'gsap';
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector4,
  WebGLRenderer,
} from 'three';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import {
  BG_ANIMATION_EASE,
  BG_ANIMATION_TIME,
  BG_DARK_OPACITY,
  BG_LIGHT_OPACITY,
  DARK_BG_COLOR,
  IS_MOBILE_DEVICE,
  IS_TOUCH_DEVICE,
  LIGHT_BG_COLOR,
  LOCAL_PERFORMANCE_RATIO,
  PARTICLES_CONFIG,
} from '../constants';
import * as Stats from 'stats.js';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService implements OnDestroy {
  private canvas: HTMLElement | undefined;
  private renderer: WebGLRenderer | undefined;
  private scene: Scene | undefined;
  private camera: PerspectiveCamera | undefined;
  private isDarkMode: boolean = true;
  private particlesOpacity: number = BG_DARK_OPACITY;

  private ngRenderer: Renderer2;
  private onResizeUnlistenFn: Function | undefined;
  private onPointerMoveUnlistenFn: Function | undefined;

  private materials: ShaderMaterial[] = [];
  private stats: Stats | undefined;

  constructor(private rendererFactory2: RendererFactory2) {
    this.ngRenderer = this.rendererFactory2.createRenderer(null, null);
    if (isDevMode()) {
      this.stats = new Stats();
      this.stats.showPanel(0);
      document.body.appendChild(this.stats.dom);
    }
  }

  public initBackground(canvas: HTMLElement): void {
    this.canvas = canvas;
    this.scene = new Scene();
    this.scene.background = new Color(DARK_BG_COLOR);
    this.renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
      canvas: this.canvas,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.outerWidth, window.outerHeight);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.camera = new PerspectiveCamera(
      70,
      window.outerWidth / window.outerHeight,
      0.1,
      100
    );
    if (IS_TOUCH_DEVICE()) {
      this.camera.position.set(-0.7, -0.4, 2);
    } else {
      this.camera.position.set(-0.7, -0.4, 1);
    }
    PARTICLES_CONFIG.map((config) => this.addParticles(config));
    this.setEventListeners();
    this.scene.rotateX(0.8);
    this.animate();
  }

  private animate(): void {
    isDevMode() && this.stats?.begin();
    this.materials.map((material: ShaderMaterial) => {
      material.uniforms['time'].value += 0.02;
      material.uniforms['uOpacity'].value = this.particlesOpacity;
      material.uniforms['uColor'].value = this.isDarkMode
        ? material.uniforms['uDarkColor'].value
        : material.uniforms['uLightColor'].value;
    });
    this.renderer?.render(
      this.scene as Scene,
      this.camera as PerspectiveCamera
    );
    isDevMode() && this.stats?.end();
    requestAnimationFrame(this.animate.bind(this));
  }

  private setEventListeners(): void {
    this.onResizeUnlistenFn = this.ngRenderer.listen(
      window,
      'resize',
      this.onResize.bind(this)
    );

    screen.orientation.onchange = this.onResize.bind(this);

    this.ngRenderer.listen(this.canvas, 'webglcontextlost', (event) => {
      event.preventDefault();
    });

    this.ngRenderer.listen(
      this.canvas,
      'webglcontextrestored',
      this.initBackground.bind(this)
    );
  }

  private onResize(): void {
    this.renderer?.setSize(window.outerWidth, window.outerHeight);
    this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    (this.camera as PerspectiveCamera).aspect =
      window.outerWidth / window.outerHeight;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
  }

  private addParticles(config: any): void {
    const width = window.outerWidth;
    let count = isDevMode()
      ? 500 * LOCAL_PERFORMANCE_RATIO
      : width <= 500
      ? 2000
      : width <= 768
      ? 3000
      : width <= 1024
      ? 5000
      : 7000;
    const minRadius = config.minRadius;
    const maxRadius = config.maxRadius;
    const particlesGeo = new PlaneGeometry(1, 1);
    const geo = new InstancedBufferGeometry();
    geo.instanceCount = count;
    geo.setAttribute('position', particlesGeo.getAttribute('position'));
    geo.index = particlesGeo.index;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const thetha = Math.random() * 2 * Math.PI;
      const t = Math.random();
      const r = minRadius * (1 - t) + maxRadius * t;
      let x = r * Math.sin(thetha);
      let y = (Math.random() - 0.5) * 0.1;
      let z = r * Math.cos(thetha);
      pos.set([x, y, z], i * 3);
    }
    geo.setAttribute('pos', new InstancedBufferAttribute(pos, 3, false));
    const material = new ShaderMaterial({
      extensions: {
        derivatives: true,
      },
      side: DoubleSide,
      uniforms: {
        uTexture: { value: new TextureLoader().load(particleTexture) },
        time: { value: 0 },
        uAmp: { value: config.amp },
        size: { value: config.size },
        uColor: { value: new Color(config.color) },
        uDarkColor: { value: new Color(config.color) },
        uLightColor: { value: new Color(config.colorLight) },
        resolution: { value: new Vector4() },
        uOpacity: { value: config.particlesOpacity },
      },
      transparent: true,
      depthTest: false,
      fragmentShader: fragment,
      vertexShader: vertex,
    });
    this.materials.push(material);
    const particles = new Mesh(geo, material);
    this.scene?.add(particles);
  }

  public setPanoramicView(): void {
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: 0,
      y: 0,
      z: 2,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: Math.PI / 2,
      y: 0,
      z: 0,
    });
  }

  public setMiddleView(): void {
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: IS_MOBILE_DEVICE() ? -0.25 : -0.7,
      y: -0.4,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: Math.PI / 2,
      y: -Math.PI / 4,
      z: 0,
    });
  }

  public setMiddleView2(): void {
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: IS_MOBILE_DEVICE() ? 0.2 : 0.5,
      y: 0.2,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: 0.5,
      y: Math.PI / 4,
      z: 0,
    });
  }

  public setInmerseView(): void {
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: IS_MOBILE_DEVICE() ? -0.25 : -0.7,
      y: -0.4,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: BG_ANIMATION_TIME,
      ease: BG_ANIMATION_EASE,
      x: 0.8,
      y: 0,
      z: 0,
    });
  }

  ngOnDestroy(): void {
    this.onResizeUnlistenFn && this.onResizeUnlistenFn();
    this.onPointerMoveUnlistenFn && this.onPointerMoveUnlistenFn();
  }

  public setDarkMode() {
    this.isDarkMode = true;
    this.particlesOpacity = BG_DARK_OPACITY;
    const color = new Color(DARK_BG_COLOR);
    gsap.to((this.scene as Scene).background, {
      duration: 0.5,
      r: color.r,
      g: color.g,
      b: color.b,
    });
  }

  public setLightMode() {
    this.isDarkMode = false;
    this.particlesOpacity = BG_LIGHT_OPACITY;
    const color = new Color(LIGHT_BG_COLOR);
    gsap.to((this.scene as Scene).background, {
      duration: 0.5,
      r: color.r,
      g: color.g,
      b: color.b,
    });
  }
}
