import particleTexture from '!!file-loader!../../../assets/images/particle.webp';
import {
  Injectable,
  OnDestroy,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import {
  Color,
  DoubleSide,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  SRGBColorSpace,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three';
import fragment from '../shaders/fragment.glsl';
import vertex from '../shaders/vertex.glsl';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService implements OnDestroy {
  private canvas: HTMLElement | undefined;
  private renderer: WebGLRenderer | undefined;
  private scene: Scene | undefined;
  private camera: PerspectiveCamera | undefined;
  private mesh: Mesh | undefined;
  private raycaster: Raycaster = new Raycaster();
  private pointer: Vector3 = new Vector3();
  public animationTime: number = 1.5;
  private animationEase: string = 'power3.inOut';

  private pointerRadius: number = 0.0;
  private pointerHalo: number = 0.06;
  private pointerGravity: number = 12;

  private ngRenderer: Renderer2;
  private onResizeUnlistenFn: Function | undefined;
  private onPointerMoveUnlistenFn: Function | undefined;

  private materials: ShaderMaterial[] = [];
  private PARTICLES_CONFIG: any[] = [
    {
      minRadius: 0.2,
      maxRadius: 1.5,
      color: '#88b3c3',
      size: 1,
      apm: 1,
      changeColor: true,
    },
    {
      minRadius: 0.2,
      maxRadius: 1.5,
      color: '#f7b373',
      size: 0.7,
      apm: 3,
      changeColor: false,
    },
  ];

  constructor(private rendererFactory2: RendererFactory2) {
    this.ngRenderer = this.rendererFactory2.createRenderer(null, null);
  }

  public initBackground(canvas: HTMLElement): void {
    this.canvas = canvas;
    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      preserveDrawingBuffer: true,
      antialias: true,
      canvas: this.canvas,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0d0d0d, 1);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.camera = new PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.001,
      100
    );
    this.camera.position.set(-0.7, -0.4, 1);
    this.PARTICLES_CONFIG.map((config) => this.addParticles(config));
    this.setEventListeners();
    this.scene.rotateX(0.8);
    this.animate();
  }

  private animate(): void {
    this.materials.map((material: ShaderMaterial) => {
      material.uniforms['time'].value += 0.02;
      material.uniforms['uMouse'].value = this.pointer;
      material.uniforms['uPointerRadius'].value = this.pointerRadius;
      material.uniforms['uPointerHalo'].value = this.pointerHalo;
      material.uniforms['uPointerGravity'].value = this.pointerGravity;
    });
    requestAnimationFrame(this.animate.bind(this));
    this.renderer?.render(
      this.scene as Scene,
      this.camera as PerspectiveCamera
    );
  }

  private setEventListeners(): void {
    this.onResizeUnlistenFn = this.ngRenderer.listen(
      window,
      'resize',
      this.onResize.bind(this)
    );

    this.mesh = new Mesh(
      new PlaneGeometry(6, 10, 10, 10).rotateX(-Math.PI / 2),
      new MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
      })
    );
    this.mesh.visible = false;
    this.scene?.add(this.mesh);

    this.onPointerMoveUnlistenFn = this.ngRenderer.listen(
      window,
      'pointermove',
      this.onPointerMove.bind(this)
    );
  }

  private onResize(): void {
    this.renderer?.setSize(window.innerWidth, window.innerHeight);
    this.renderer?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    (this.camera as PerspectiveCamera).aspect =
      window.innerWidth / window.innerHeight;
    (this.camera as PerspectiveCamera).updateProjectionMatrix();
  }

  private onPointerMove(event: PointerEvent): void {
    const pointer = new Vector2();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    this.raycaster.setFromCamera(pointer, this.camera as PerspectiveCamera);
    const intersects = this.raycaster.intersectObjects([this.mesh as Mesh]);
    if (intersects.length) {
      this.pointer.copy(intersects[0].point);
    }
  }

  private addParticles(config: any): void {
    let count = 10000;
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
        uMouse: { value: new Vector3() },
        uPointerRadius: { value: this.pointerRadius },
        uPointerHalo: { value: this.pointerHalo },
        uPointerGravity: { value: this.pointerGravity },
        size: { value: config.size },
        uColor: { value: new Color(config.color) },
        resolution: { value: new Vector4() },
        changeColor: { value: config.changeColor },
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
    this.pointerHalo = 0.12;
    this.pointerGravity = 5;
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: 0,
      y: 0,
      z: 2,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: Math.PI / 2,
      y: 0,
      z: 0,
    });
  }

  public setMiddleView(): void {
    this.pointerHalo = 0.09;
    this.pointerGravity = 10;
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: -0.7,
      y: -0.4,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: Math.PI / 2,
      y: -Math.PI / 4,
      z: 0,
    });
  }

  public setMiddleView2(): void {
    this.pointerHalo = 0.09;
    this.pointerGravity = 12;
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: 0.5,
      y: 0.2,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: 0.5,
      y: Math.PI / 4,
      z: 0,
    });
  }

  public setInmerseView(): void {
    this.pointerHalo = 0.06;
    this.pointerGravity = 12;
    gsap.to((this.camera as PerspectiveCamera)?.position, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: -0.7,
      y: -0.4,
      z: 1,
    });
    gsap.to((this.scene as Scene)?.rotation, {
      duration: this.animationTime,
      ease: this.animationEase,
      x: 0.8,
      y: 0,
      z: 0,
    });
  }

  ngOnDestroy(): void {
    this.onResizeUnlistenFn && this.onResizeUnlistenFn();
    this.onPointerMoveUnlistenFn && this.onPointerMoveUnlistenFn();
  }
}