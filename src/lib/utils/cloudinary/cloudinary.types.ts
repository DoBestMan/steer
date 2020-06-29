export enum Angle {
  AUTO_LEFT = 'auto_left',
  AUTO_RIGHT = 'auto_right',
  HFLIP = 'hflip',
  IGNORE = 'ignore',
  VFLIP = 'vflip',
}

export enum AudioCodec {
  AAC = 'aac',
  MP3 = 'mp3',
  NONE = 'none',
  VORBIS = 'vorbis',
}

export enum ColorSpace {
  NO_SMYK = 'no_cmyk',
  RGB = 'rgb',
  SRGB = 'srgb',
}

export enum CropMode {
  CROP = 'crop',
  FILL = 'fill',
  FIT = 'fit',
  IMAGGA_CROP = 'imagga_crop',
  IMAGGA_SCALE = 'imagga_scale',
  LFILL = 'lfill',
  LIMIT = 'limit',
  LPAD = 'lpad',
  MFIT = 'mfit',
  MPAD = 'mpad',
  PAD = 'pad',
  SCALE = 'scale',
  THUMB = 'thumb',
}

export interface CustomFunction {
  function_type: CustomFunctionType;
  source: string;
}

export enum CustomFunctionType {
  REMOTE = 'remote',
  WASM = 'wasm',
}

export enum FetchFormat {
  AUTO = 'auto',
  PNG = 'png',
}

export enum Effect {
  ANTI_REMOVAL = 'anti_removal',
  ART = 'art',
  ASSIST_COLORBLIND = 'assist_colorblind',
  AUTO_BRIGHTNESS = 'auto_brightness',
  AUTO_COLOR = 'auto_color',
  AUTO_CONTRAST = 'auto_contrast',
  BGREMOVAL = 'bgremoval',
  BLACKWHITE = 'blackwhite',
  BLUE = 'blue',
  BLUR = 'blur',
  BLUR_FACES = 'blur_faces',
  BLUR_REGION = 'blur_region',
  BRIGHTNESS = 'brightness',
  BRIGHTNESS_HSB = 'brightness_hsb',
  CARTOONIFY = 'cartoonify',
  COLORIZE = 'colorize',
  CONTRAST = 'contrast',
  CUT_OUT = 'cut_out',
  DISPLACE = 'displace',
  DISTORT = 'distort',
  FADE = 'fade',
  FILL_LIGHT = 'fill_light',
  GAMMA = 'gamma',
  GRADIENT_FADE = 'gradient_fade',
  GRAYSCALE = 'grayscale',
  GREEN = 'green',
  HUE = 'hue',
  IMPROVE = 'improve',
  LOOP = 'loop',
  MAKE_TRANSPARENT = 'make_transparent',
  MULTIPLY = 'multiply',
  NEGATE = 'negate',
  OIL_PAINT = 'oil_paint',
  OPACITY_THRESHOLD = 'opacity_threshold',
  ORDERED_DITHER = 'ordered_dither',
  OUTLINE = 'outline',
  OVERLAY = 'overlay',
  PIXELATE = 'pixelate',
  PIXELATE_FACES = 'pixelate_faces',
  PIXELATE_REGION = 'pixelate_region',
  RECOLOR = 'recolor',
  RED = 'red',
  REDEYE = 'redeye',
  REPLACE_COLOR = 'replace_color',
  SATURATION = 'saturation',
  SCREEN = 'screen',
  SEPIA = 'sepia',
  SHADOW = 'shadow',
  SHARPEN = 'sharpen',
  SHEAR = 'shear',
  SIMULATE_COLORBIND = 'simulate_colorblind',
  STYLE_TRANSFER = 'style_transfer',
  TINT = 'tint',
  TRIM = 'trim',
  UNSHARP_MASK = 'unsharp_mask',
  VECTORIZE = 'vectorize',
  VIBRANCE = 'vibrance',
  VIESUS_CORRECT = 'viesus_correct',
  VIGNETTE = 'vignette',
}

export enum Gravity {
  ADV_EYES = 'adv_eyes',
  ADV_FACE = 'adv_face',
  ADV_FACES = 'adv_faces',
  AUTO = 'auto',
  AUTO_ADV_EYES = 'auto:adv_eyes',
  AUTO_ADV_FACE = 'auto:adv_face',
  AUTO_ADV_FACES = 'auto:adv_faces',
  AUTO_BODY = 'auto:body',
  AUTO_CUSTOM_NO_OVERRIDE = 'auto:custom_no_override',
  AUTO_FACE = 'auto:face',
  AUTO_FACES = 'auto:faces',
  AUTO_NONE = 'auto:none',
  BODY = 'body',
  BODY_FACE = 'body:face',
  CENTER = 'center',
  CUSTOM = 'custom',
  CUSTOM_ADV_FACE = 'custom:adv_face',
  CUSTOM_ADV_FACES = 'custom:adv_faces',
  CUSTOM_FACE = 'custom:face',
  CUSTOM_FACES = 'custom:faces',
  EAST = 'east',
  FACE = 'face',
  FACE_AUTO = 'face:auto',
  FACE_CENTER = 'face:center',
  FACES = 'faces',
  FACES_AUTO = 'faces:auto',
  FACES_CENTER = 'faces:center',
  NORTH = 'north',
  NORTH_WEST = 'north_west',
  SOUTH = 'south',
  SOUTH_EAST = 'south_east',
  SOUTH_WEST = 'south_west',
  WEST = 'west',
  XY_CENTER = 'xy_center',
}

export enum ImageFileExtension {
  AI = 'ai',
  BMP = 'bmp',
  DJVU = 'djvu',
  EPS = 'eps',
  EPS3 = 'eps3',
  EPT = 'ept',
  FLIF = 'flif',
  GIF = 'gif',
  HDP = 'hdp',
  ICO = 'ico',
  J2K = 'j2k',
  JP2 = 'jp2',
  JPC = 'jpc',
  JPE = 'jpe',
  JPEG = 'jpeg',
  JPG = 'jpg',
  JXR = 'jxr',
  PDF = 'pdf',
  PNG = 'png',
  PS = 'ps',
  PSD = 'psd',
  SVG = 'svg',
  TIF = 'tif',
  TIFF = 'tiff',
  WDP = 'wdp',
  WEBP = 'webp',
}

export enum ImageFlags {
  ANY_FORMAT = 'any_format',
  ATTACHMENT = 'attachment',
  AWEB = 'awebp',
  CLIP = 'clip',
  CUTTER = 'cutter',
  FORCE_STRIP = 'force_strip',
  IGNORE_ASPECT_RATIO = 'ignore_aspect_ratio',
  KEEP_IPTC = 'keep_iptc',
  LAYER_APPLY = 'layer_apply',
  LOSSY = 'lossy',
  NO_OVERFLOW = 'no_overflow',
  PNG8 = 'png8',
  PRESERVE_TRANSPARENCY = 'preserve_transparency',
  PROGRESSIVE = 'progressive',
  RASTERIZE = 'rasterize',
  REGION_RELATIVE = 'region_relative',
  RELATIVE = 'relative',
  STRIP_PROFILE = 'strip_profile',
  TEXT_NO_TRIM = 'text_no_trim',
  TILED = 'tiled',
}

export enum StreamingProfiles {
  FOUR_K = '4k',
  FULL_HD = 'full_hd',
  FULL_HD_LEAN = 'full_hd_lean',
  FULL_HD_WIFI = 'full_hd_wifi',
  HD = 'hd',
  HD_LEAN = 'hd_lean',
  SD = 'sd',
}

export enum VideoFileExtension {
  FLV = 'flv',
  M3U8 = 'm3u8',
  MP4 = 'mp4',
  OGV = 'ogv',
  WEBM = 'webm',
}

export enum VideoFlags {
  LAYER_APPLY = 'layer_apply',
  NO_STREAM = 'no_stream',
  SPLICE = 'splice',
  TRUNCATE_TS = 'truncate_ts',
  WAVEFORM = 'waveform',
}

export type Transformations = {
  angle?: Angle | number;
  aspectRatio?: string | number;
  background?: string;
  border?: string;
  color?: ColorSpace | [ColorSpace, string];
  crop?: CropMode;
  effect?: Effect | [Effect, string | number];
  fetchFormat?: FetchFormat;
  gravity?: Gravity;
  height?: number;
  opacity?: number;
  quality?: number;
  radius?: number;
  width?: number;
  x?: number;
  y?: number;
  zoom?: number;
};

export type TransformationArgs =
  | Transformations
  | Array<Transformations>
  | Record<string, Transformations | Array<Transformations>>;
