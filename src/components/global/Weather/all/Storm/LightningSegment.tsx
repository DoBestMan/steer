import { vtx2d } from './Storm';

class LightningSegment {
  pos: vtx2d;
  range: vtx2d;
  isRendered: boolean;

  constructor() {
    this.pos = { x: 0, y: 0 };
    this.range = { x: 1, y: 1 };
    this.isRendered = false;
  }

  init({ pos, range }: { pos: vtx2d; range: vtx2d }) {
    this.pos = pos;
    this.range = range;
  }
}

export default LightningSegment;
