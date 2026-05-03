const fileInput = document.querySelector("#fileInput");
const fileSummary = document.querySelector("#fileSummary");
const playPauseButton = document.querySelector("#playPauseButton");
const stopButton = document.querySelector("#stopButton");
const restartButton = document.querySelector("#restartButton");
const rollModeButton = document.querySelector("#rollModeButton");
const fallingModeButton = document.querySelector("#fallingModeButton");
const speedRange = document.querySelector("#speedRange");
const speedValue = document.querySelector("#speedValue");
const timbreSelect = document.querySelector("#timbreSelect");
const startDelayRange = document.querySelector("#startDelayRange");
const startDelayValue = document.querySelector("#startDelayValue");
const fallSecondsRange = document.querySelector("#fallSecondsRange");
const fallSecondsValue = document.querySelector("#fallSecondsValue");
const backgroundColorInput = document.querySelector("#backgroundColorInput");
const noteColorModeSelect = document.querySelector("#noteColorModeSelect");
const noteColorInput = document.querySelector("#noteColorInput");
const gridColorInput = document.querySelector("#gridColorInput");
const hitLineColorInput = document.querySelector("#hitLineColorInput");
const noteShapeSelect = document.querySelector("#noteShapeSelect");
const glowRange = document.querySelector("#glowRange");
const glowValue = document.querySelector("#glowValue");
const trailRange = document.querySelector("#trailRange");
const trailValue = document.querySelector("#trailValue");
const particlesRange = document.querySelector("#particlesRange");
const particlesValue = document.querySelector("#particlesValue");
const reflectionRange = document.querySelector("#reflectionRange");
const reflectionValue = document.querySelector("#reflectionValue");
const gridOpacityRange = document.querySelector("#gridOpacityRange");
const gridOpacityValue = document.querySelector("#gridOpacityValue");
const appearancePresetSelect = document.querySelector("#appearancePresetSelect");
const resetAppearanceButton = document.querySelector("#resetAppearanceButton");
const customPresetNameInput = document.querySelector("#customPresetNameInput");
const saveAppearancePresetButton = document.querySelector("#saveAppearancePresetButton");
const deleteAppearancePresetButton = document.querySelector("#deleteAppearancePresetButton");
const seekRange = document.querySelector("#seekRange");
const currentTimeLabel = document.querySelector("#currentTime");
const durationTimeLabel = document.querySelector("#durationTime");
const noteCountLabel = document.querySelector("#noteCount");
const noteRangeLabel = document.querySelector("#noteRange");
const channelCountLabel = document.querySelector("#channelCount");
const tempoValueLabel = document.querySelector("#tempoValue");
const emptyState = document.querySelector("#emptyState");
const visualizer = document.querySelector(".visualizer");
const keyboard = document.querySelector("#keyboard");
const canvas = document.querySelector("#pianoRoll");
const ctx = canvas.getContext("2d");
const midiLibrary = document.querySelector("#midiLibrary");
const libraryToggleButton = document.querySelector("#libraryToggleButton");
const libraryFolderButton = document.querySelector("#libraryFolderButton");
const libraryFolderInput = document.querySelector("#libraryFolderInput");
const librarySearchInput = document.querySelector("#librarySearchInput");
const libraryStatus = document.querySelector("#libraryStatus");
const libraryList = document.querySelector("#libraryList");

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const MAX_OVERLAPPED_SAME_NOTE = 1;
const AUDIO_LOOKAHEAD_SECONDS = 1.4;
const AUDIO_RESCHEDULE_THRESHOLD_SECONDS = 0.45;
const CHANNEL_COLORS = [
  "#2fd1a6",
  "#ffca3a",
  "#58a6ff",
  "#ff7a90",
  "#b084ff",
  "#7ddc6f",
  "#f78c45",
  "#46d7ef",
  "#f36bd5",
  "#a2e85b",
  "#ff9fba",
  "#9fa8ff",
  "#d6c44f",
  "#7bd4b2",
  "#f5785d",
  "#b5becd",
];

const SETTINGS_STORAGE_KEY = "midVisualizerSettings";
const CUSTOM_PRESETS_STORAGE_KEY = "midVisualizerAppearancePresets";
const DEFAULT_SETTINGS = {
  viewMode: "falling",
  speed: "1",
  timbre: "visualOnly",
  startDelay: "3",
  fallSeconds: "3.5",
  backgroundColor: "#000000",
  noteColorMode: "channel",
  noteColor: "#2fd1a6",
  gridColor: "#ffffff",
  hitLineColor: "#ffffff",
  noteShape: "round",
  glow: "14",
  trail: "0.35",
  particles: "0.45",
  reflection: "0.3",
  gridOpacity: "0.12",
};

const TIMBRE_PRESETS = {
  softPiano: {
    oscillator: "sine",
    secondOscillator: "triangle",
    secondGain: 0.28,
    detune: 3,
    attack: 0.008,
    decay: 0.42,
    sustain: 0.22,
    release: 0.22,
    filter: 2200,
    volume: 0.13,
  },
  brightPiano: {
    oscillator: "triangle",
    secondOscillator: "sine",
    secondGain: 0.18,
    detune: 7,
    attack: 0.004,
    decay: 0.34,
    sustain: 0.16,
    release: 0.16,
    filter: 4200,
    volume: 0.12,
  },
  bell: {
    oscillator: "sine",
    secondOscillator: "sine",
    secondGain: 0.45,
    secondRatio: 2.01,
    detune: 0,
    attack: 0.004,
    decay: 1.1,
    sustain: 0.08,
    release: 0.75,
    filter: 6200,
    volume: 0.1,
  },
  organ: {
    oscillator: "sine",
    secondOscillator: "square",
    secondGain: 0.16,
    secondRatio: 2,
    detune: 0,
    attack: 0.015,
    decay: 0.08,
    sustain: 0.72,
    release: 0.08,
    filter: 3600,
    volume: 0.09,
  },
  pluck: {
    oscillator: "triangle",
    secondOscillator: "sine",
    secondGain: 0.2,
    detune: -5,
    attack: 0.002,
    decay: 0.16,
    sustain: 0.05,
    release: 0.08,
    filter: 3100,
    volume: 0.12,
  },
  pad: {
    oscillator: "sine",
    secondOscillator: "triangle",
    secondGain: 0.33,
    detune: 9,
    attack: 0.16,
    decay: 0.35,
    sustain: 0.48,
    release: 0.9,
    filter: 1800,
    volume: 0.075,
  },
  chip: {
    oscillator: "square",
    secondOscillator: "triangle",
    secondGain: 0.08,
    detune: 0,
    attack: 0.002,
    decay: 0.08,
    sustain: 0.32,
    release: 0.04,
    filter: 5200,
    volume: 0.075,
  },
};

const APPEARANCE_PRESETS = {
  neon: {
    backgroundColor: "#000000",
    noteColorMode: "channel",
    noteColor: "#2fd1a6",
    gridColor: "#6ef6ff",
    hitLineColor: "#ffffff",
    noteShape: "pill",
    glow: "24",
    trail: "0.55",
    particles: "0.75",
    reflection: "0.45",
    gridOpacity: "0.16",
  },
  crystal: {
    backgroundColor: "#020711",
    noteColorMode: "single",
    noteColor: "#7ddcff",
    gridColor: "#a9d8ff",
    hitLineColor: "#dff7ff",
    noteShape: "diamond",
    glow: "18",
    trail: "0.25",
    particles: "0.55",
    reflection: "0.5",
    gridOpacity: "0.1",
  },
  minimal: {
    backgroundColor: "#000000",
    noteColorMode: "single",
    noteColor: "#ffffff",
    gridColor: "#ffffff",
    hitLineColor: "#ffffff",
    noteShape: "square",
    glow: "0",
    trail: "0",
    particles: "0",
    reflection: "0",
    gridOpacity: "0.06",
  },
  warm: {
    backgroundColor: "#0d0602",
    noteColorMode: "velocity",
    noteColor: "#ffb84d",
    gridColor: "#ffd08a",
    hitLineColor: "#fff1d4",
    noteShape: "round",
    glow: "18",
    trail: "0.35",
    particles: "0.4",
    reflection: "0.25",
    gridOpacity: "0.11",
  },
};

const APPEARANCE_SETTING_KEYS = [
  "backgroundColor",
  "noteColorMode",
  "noteColor",
  "gridColor",
  "hitLineColor",
  "noteShape",
  "glow",
  "trail",
  "particles",
  "reflection",
  "gridOpacity",
];

let song = null;
let audioContext = null;
let masterGain = null;
let masterCompressor = null;
let audioGraphPrewarmed = false;
let viewMode = "falling";
let particles = [];
let emittedNoteKeys = new Set();
let lastFrameTime = performance.now();
let pendingStartTimer = 0;
let pendingStartInterval = 0;
let pendingStartAt = 0;
let pendingStart = false;
let stoppedBlank = false;
let libraryFiles = [];
let activeLibraryPath = "";
let playback = {
  playing: false,
  position: 0,
  startedAt: 0,
  speed: 1,
  scheduleUntil: 0,
  scheduled: [],
};

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;

  await loadMidiFile(file);
  fileInput.value = "";
});

libraryToggleButton.addEventListener("click", () => {
  setLibraryCollapsed(!midiLibrary.classList.contains("collapsed"));
});

libraryFolderButton.addEventListener("click", () => {
  libraryFolderInput.click();
});

libraryFolderInput.addEventListener("change", () => {
  libraryFiles = Array.from(libraryFolderInput.files || [])
    .filter((file) => isMidiFile(file.name))
    .sort((a, b) => getLibraryPath(a).localeCompare(getLibraryPath(b), "pt-BR"));

  activeLibraryPath = "";
  librarySearchInput.value = "";
  renderLibraryList();
  setLibraryCollapsed(false);
});

librarySearchInput.addEventListener("input", () => {
  renderLibraryList();
});

playPauseButton.addEventListener("click", async () => {
  if (!song) return;

  if (pendingStart) {
    clearPendingStart();
    return;
  }

  if (playback.playing) {
    pausePlayback();
    return;
  }

  await requestStartPlayback();
});

restartButton.addEventListener("click", async () => {
  if (!song) return;
  await requestRestartPlayback();
});

stopButton.addEventListener("click", () => {
  stopAndResetPlayback();
});

fallingModeButton.addEventListener("click", () => {
  setViewMode("falling");
  saveSettings();
});

rollModeButton.addEventListener("click", () => {
  setViewMode("roll");
  saveSettings();
});

speedRange.addEventListener("input", () => {
  const nextSpeed = Number(speedRange.value);
  if (playback.playing) {
    playback.position = getCurrentSongTime();
    playback.speed = nextSpeed;
    playback.startedAt = getPlaybackClockTime() - playback.position / nextSpeed;
    clearScheduledNotes();
    if (!isVisualOnly()) scheduleNotes(true);
  } else {
    playback.speed = nextSpeed;
  }
  speedValue.textContent = `${nextSpeed.toFixed(2)}x`;
  saveSettings();
});

timbreSelect.addEventListener("change", () => {
  if (playback.playing) {
    playback.position = getCurrentSongTime();
    if (audioContext) {
      playback.startedAt = audioContext.currentTime - playback.position / playback.speed;
    } else {
      playback.startedAt = performance.now() / 1000 - playback.position / playback.speed;
    }
    clearScheduledNotes();
    if (!isVisualOnly()) scheduleNotes(true);
  }
  saveSettings();
});

startDelayRange.addEventListener("input", () => {
  startDelayValue.textContent = `${Number(startDelayRange.value).toFixed(1)}s`;
  saveSettings();
});

fallSecondsRange.addEventListener("input", () => {
  fallSecondsValue.textContent = `${Number(fallSecondsRange.value).toFixed(1)}s`;
  saveSettings();
  draw();
});

window.addEventListener("keydown", async (event) => {
  if (!song) return;
  if (!["F8", "F9", "F10", "F11"].includes(event.key)) return;

  event.preventDefault();
  if (event.repeat) return;

  if (event.key === "F8") {
    await requestStartPlayback();
  } else if (event.key === "F9") {
    if (pendingStart) clearPendingStart();
    else if (playback.playing) pausePlayback();
    else if (isPausedMidSong()) await startPlayback();
    else await requestStartPlayback();
  } else if (event.key === "F10") {
    stopAndResetPlayback();
  } else if (event.key === "F11") {
    await requestRestartPlayback();
  }
});

for (const control of [
  backgroundColorInput,
  noteColorModeSelect,
  noteColorInput,
  gridColorInput,
  hitLineColorInput,
  noteShapeSelect,
  glowRange,
  trailRange,
  particlesRange,
  reflectionRange,
  gridOpacityRange,
]) {
  control.addEventListener("input", () => {
    syncAppearanceLabels();
    appearancePresetSelect.value = "";
    saveSettings();
    draw();
  });
}

appearancePresetSelect.addEventListener("change", () => {
  if (!appearancePresetSelect.value) return;
  applyAppearancePreset(appearancePresetSelect.value);
});

saveAppearancePresetButton.addEventListener("click", () => {
  saveCustomAppearancePreset();
});

deleteAppearancePresetButton.addEventListener("click", () => {
  deleteSelectedCustomPreset();
});

resetAppearanceButton.addEventListener("click", () => {
  applySettings({ ...getSettings(), ...getDefaultAppearanceSettings() });
  appearancePresetSelect.value = "";
  saveSettings();
  draw();
});

seekRange.addEventListener("input", () => {
  if (!song) return;
  playback.position = (Number(seekRange.value) / 1000) * song.duration;
  stoppedBlank = false;
  particles = [];
  emittedNoteKeys = new Set();
  if (playback.playing) {
    playback.startedAt = getPlaybackClockTime() - playback.position / playback.speed;
    clearScheduledNotes();
    if (!isVisualOnly()) scheduleNotes(true);
  }
  updateTransport();
  draw();
});

window.addEventListener("resize", () => {
  if (song) renderKeyboard();
  draw();
});
requestAnimationFrame(tick);
renderPresetOptions();
loadSettings();
setViewMode(viewMode);
syncAppearanceLabels();
startDelayValue.textContent = `${Number(startDelayRange.value).toFixed(1)}s`;
updateEmptyState();
renderLibraryList();

async function loadMidiFile(file, libraryPath = "") {
  stopPlayback();
  fileSummary.textContent = "Lendo arquivo...";

  try {
    const buffer = await file.arrayBuffer();
    song = parseMidi(buffer, file.name);
    playback.position = 0;
    stoppedBlank = false;
    particles = [];
    emittedNoteKeys = new Set();
    activeLibraryPath = libraryPath;
    updateLoadedState(file.name);
    renderLibraryList();
    draw();
  } catch (error) {
    song = null;
    activeLibraryPath = "";
    updateEmptyState();
    renderLibraryList();
    fileSummary.textContent = error.message || "Nao foi possivel ler este arquivo MIDI.";
  }
}

function setLibraryCollapsed(collapsed) {
  midiLibrary.classList.toggle("collapsed", collapsed);
  libraryToggleButton.setAttribute("aria-expanded", String(!collapsed));
}

function renderLibraryList() {
  const query = librarySearchInput.value.trim().toLowerCase();
  const visibleFiles = libraryFiles.filter((file) =>
    getLibraryPath(file).toLowerCase().includes(query)
  );

  libraryList.innerHTML = "";
  libraryStatus.textContent = libraryFiles.length
    ? `${libraryFiles.length} MIDI(s) carregado(s)`
    : "Nenhuma pasta selecionada";

  if (!libraryFiles.length) {
    libraryList.append(createLibraryEmpty("Selecione uma pasta com arquivos .mid ou .midi."));
    return;
  }

  if (!visibleFiles.length) {
    libraryList.append(createLibraryEmpty("Nenhuma musica encontrada nesse filtro."));
    return;
  }

  for (const file of visibleFiles) {
    const path = getLibraryPath(file);
    const item = document.createElement("button");
    item.type = "button";
    item.className = "librarySong";
    item.classList.toggle("active", path === activeLibraryPath);
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", String(path === activeLibraryPath));
    item.addEventListener("click", () => loadMidiFile(file, path));

    const text = document.createElement("span");
    text.className = "librarySongText";

    const title = document.createElement("span");
    title.className = "librarySongTitle";
    title.textContent = file.name.replace(/\.(mid|midi)$/i, "");

    const location = document.createElement("span");
    location.className = "librarySongPath";
    location.textContent = path.includes("/")
      ? path.split("/").slice(0, -1).join("/")
      : "Pasta selecionada";

    text.append(title, location);
    item.append(text);
    libraryList.append(item);
  }
}

function createLibraryEmpty(text) {
  const empty = document.createElement("div");
  empty.className = "libraryEmpty";
  empty.textContent = text;
  return empty;
}

function getLibraryPath(file) {
  return file.webkitRelativePath || file.name;
}

function isMidiFile(fileName) {
  return /\.(mid|midi)$/i.test(fileName);
}

function parseMidi(buffer, fileName) {
  const reader = new MidiReader(buffer);
  const headerId = reader.readString(4);
  if (headerId !== "MThd") {
    throw new Error("Este arquivo nao parece ser um MIDI valido.");
  }

  const headerLength = reader.readUint32();
  const format = reader.readUint16();
  const trackCount = reader.readUint16();
  const division = reader.readUint16();
  reader.skip(headerLength - 6);

  const usesSmpte = (division & 0x8000) !== 0;
  if (usesSmpte) {
    throw new Error("Arquivos MIDI em divisao SMPTE ainda nao sao suportados.");
  }

  const ticksPerBeat = division;
  const events = [];
  const tempoEvents = [{ tick: 0, microsecondsPerBeat: 500000 }];

  for (let trackIndex = 0; trackIndex < trackCount; trackIndex += 1) {
    const trackId = reader.readString(4);
    const trackLength = reader.readUint32();
    if (trackId !== "MTrk") {
      reader.skip(trackLength);
      continue;
    }

    const trackEnd = reader.offset + trackLength;
    let tick = 0;
    let runningStatus = null;

    while (reader.offset < trackEnd) {
      tick += reader.readVarLength();
      let status = reader.readUint8();

      if (status < 0x80) {
        if (runningStatus === null) {
          throw new Error("Evento MIDI sem status valido.");
        }
        reader.offset -= 1;
        status = runningStatus;
      } else if (status < 0xf0) {
        runningStatus = status;
      }

      if (status === 0xff) {
        const type = reader.readUint8();
        const length = reader.readVarLength();
        const dataStart = reader.offset;

        if (type === 0x51 && length === 3) {
          const microsecondsPerBeat =
            (reader.readUint8() << 16) | (reader.readUint8() << 8) | reader.readUint8();
          tempoEvents.push({ tick, microsecondsPerBeat });
        } else {
          reader.skip(length);
        }

        reader.offset = dataStart + length;
        continue;
      }

      if (status === 0xf0 || status === 0xf7) {
        reader.skip(reader.readVarLength());
        continue;
      }

      if (status >= 0xf0) {
        reader.skip(systemMessageLength(status));
        continue;
      }

      const eventType = status >> 4;
      const channel = status & 0x0f;
      const first = reader.readUint8();
      const hasTwoDataBytes = eventType !== 0xc && eventType !== 0xd;
      const second = hasTwoDataBytes ? reader.readUint8() : 0;

      if (eventType === 0x9 && second > 0) {
        events.push({
          type: "noteOn",
          tick,
          channel,
          note: first,
          velocity: second,
          track: trackIndex,
        });
      } else if (eventType === 0x8 || (eventType === 0x9 && second === 0)) {
        events.push({
          type: "noteOff",
          tick,
          channel,
          note: first,
          velocity: second,
          track: trackIndex,
        });
      }
    }

    reader.offset = trackEnd;
  }

  const tempoMap = buildTempoMap(tempoEvents, ticksPerBeat);
  const notes = pairNotes(events, tempoMap, ticksPerBeat);
  if (notes.length === 0) {
    throw new Error("Nao encontrei notas tocaveis neste arquivo MIDI.");
  }

  const minNote = Math.min(...notes.map((note) => note.midi));
  const maxNote = Math.max(...notes.map((note) => note.midi));
  const duration = Math.max(...notes.map((note) => note.end));
  const channels = [...new Set(notes.map((note) => note.channel))].sort((a, b) => a - b);
  const initialBpm = Math.round(60000000 / tempoMap[0].microsecondsPerBeat);

  notes.sort((a, b) => a.start - b.start || a.midi - b.midi);

  return {
    fileName,
    format,
    trackCount,
    ticksPerBeat,
    notes,
    duration,
    minNote,
    maxNote,
    channels,
    initialBpm,
  };
}

function buildTempoMap(tempoEvents, ticksPerBeat) {
  const byTick = new Map();
  for (const event of tempoEvents) {
    byTick.set(event.tick, event);
  }

  const sorted = [...byTick.values()].sort((a, b) => a.tick - b.tick);

  let seconds = 0;
  let lastTick = sorted[0].tick;
  let lastTempo = sorted[0].microsecondsPerBeat;
  const map = [];

  for (const event of sorted) {
    seconds += ((event.tick - lastTick) * lastTempo) / ticksPerBeat / 1000000;
    map.push({
      tick: event.tick,
      seconds,
      microsecondsPerBeat: event.microsecondsPerBeat,
    });
    lastTick = event.tick;
    lastTempo = event.microsecondsPerBeat;
  }

  return map;
}

function ticksToSeconds(tick, tempoMap, ticksPerBeat) {
  let tempo = tempoMap[0];
  for (const entry of tempoMap) {
    if (entry.tick > tick) break;
    tempo = entry;
  }
  return (
    tempo.seconds +
    ((tick - tempo.tick) * tempo.microsecondsPerBeat) / ticksPerBeat / 1000000
  );
}

function pairNotes(events, tempoMap, ticksPerBeat) {
  const active = new Map();
  const notes = [];
  events.sort((a, b) => a.tick - b.tick || eventSortWeight(a) - eventSortWeight(b));

  for (const event of events) {
    const key = `${event.track}:${event.channel}:${event.note}`;
    if (event.type === "noteOn") {
      if (!active.has(key)) active.set(key, []);
      const stack = active.get(key);
      if (stack.length >= MAX_OVERLAPPED_SAME_NOTE) {
        pushPairedNote(notes, stack.shift(), event, tempoMap, ticksPerBeat);
      }
      stack.push(event);
      continue;
    }

    const stack = active.get(key);
    if (!stack || stack.length === 0) continue;

    const startEvent = stack.shift();
    pushPairedNote(notes, startEvent, event, tempoMap, ticksPerBeat);
  }

  return notes;
}

function pushPairedNote(notes, startEvent, endEvent, tempoMap, ticksPerBeat) {
  const start = ticksToSeconds(startEvent.tick, tempoMap, ticksPerBeat);
  const end = ticksToSeconds(endEvent.tick, tempoMap, ticksPerBeat);
  if (end <= start) return;

  notes.push({
    midi: startEvent.note,
    name: noteName(startEvent.note),
    channel: startEvent.channel,
    track: startEvent.track,
    velocity: startEvent.velocity,
    start,
    end,
    duration: end - start,
  });
}

class MidiReader {
  constructor(buffer) {
    this.view = new DataView(buffer);
    this.offset = 0;
  }

  readUint8() {
    return this.view.getUint8(this.offset++);
  }

  readUint16() {
    const value = this.view.getUint16(this.offset, false);
    this.offset += 2;
    return value;
  }

  readUint32() {
    const value = this.view.getUint32(this.offset, false);
    this.offset += 4;
    return value;
  }

  readString(length) {
    let value = "";
    for (let index = 0; index < length; index += 1) {
      value += String.fromCharCode(this.readUint8());
    }
    return value;
  }

  readVarLength() {
    let value = 0;
    while (true) {
      const byte = this.readUint8();
      value = (value << 7) | (byte & 0x7f);
      if ((byte & 0x80) === 0) break;
    }
    return value;
  }

  skip(length) {
    this.offset += Math.max(0, length);
  }
}

function eventSortWeight(event) {
  return event.type === "noteOff" ? 0 : 1;
}

function systemMessageLength(status) {
  if (status === 0xf1 || status === 0xf3) return 1;
  if (status === 0xf2) return 2;
  return 0;
}

function updateLoadedState(fileName) {
  emptyState.classList.add("hidden");
  playPauseButton.disabled = false;
  stopButton.disabled = false;
  restartButton.disabled = false;
  seekRange.disabled = false;
  playPauseButton.textContent = "Tocar";

  setSongSummary(fileName);
  noteCountLabel.textContent = String(song.notes.length);
  noteRangeLabel.textContent = `${noteName(song.minNote)} - ${noteName(song.maxNote)}`;
  channelCountLabel.textContent = String(song.channels.length);
  tempoValueLabel.textContent = `${song.initialBpm} BPM`;
  durationTimeLabel.textContent = formatTime(song.duration);
  currentTimeLabel.textContent = formatTime(0);
  seekRange.value = "0";
  renderKeyboard();
}

function setSongSummary(fileName = song?.fileName) {
  if (!song) return;
  fileSummary.textContent = `${fileName} | formato ${song.format}, ${song.trackCount} trilha(s), ${song.ticksPerBeat} ticks/batida`;
}

function updateEmptyState() {
  clearPendingStart(false);
  emptyState.classList.remove("hidden");
  playPauseButton.disabled = true;
  stopButton.disabled = true;
  restartButton.disabled = true;
  seekRange.disabled = true;
  noteCountLabel.textContent = "0";
  noteRangeLabel.textContent = "-";
  channelCountLabel.textContent = "0";
  tempoValueLabel.textContent = "120 BPM";
  currentTimeLabel.textContent = "0:00.0";
  durationTimeLabel.textContent = "0:00.0";
  draw();
}

function setViewMode(mode) {
  viewMode = mode;
  const isFalling = mode === "falling";
  visualizer.classList.toggle("fallingMode", isFalling);
  fallingModeButton.classList.toggle("active", isFalling);
  rollModeButton.classList.toggle("active", !isFalling);
  if (song) renderKeyboard();
  draw();
}

function getSettings() {
  return {
    viewMode,
    speed: speedRange.value,
    timbre: timbreSelect.value,
    startDelay: startDelayRange.value,
    fallSeconds: fallSecondsRange.value,
    backgroundColor: backgroundColorInput.value,
    noteColorMode: noteColorModeSelect.value,
    noteColor: noteColorInput.value,
    gridColor: gridColorInput.value,
    hitLineColor: hitLineColorInput.value,
    noteShape: noteShapeSelect.value,
    glow: glowRange.value,
    trail: trailRange.value,
    particles: particlesRange.value,
    reflection: reflectionRange.value,
    gridOpacity: gridOpacityRange.value,
  };
}

function applySettings(settings) {
  const next = { ...DEFAULT_SETTINGS, ...settings };
  viewMode = next.viewMode === "roll" ? "roll" : "falling";
  speedRange.value = next.speed;
  timbreSelect.value = TIMBRE_PRESETS[next.timbre] ? next.timbre : DEFAULT_SETTINGS.timbre;
  startDelayRange.value = next.startDelay;
  fallSecondsRange.value = next.fallSeconds;
  backgroundColorInput.value = next.backgroundColor;
  noteColorModeSelect.value = next.noteColorMode;
  noteColorInput.value = next.noteColor;
  gridColorInput.value = next.gridColor;
  hitLineColorInput.value = next.hitLineColor;
  noteShapeSelect.value = next.noteShape;
  glowRange.value = next.glow;
  trailRange.value = next.trail;
  particlesRange.value = next.particles;
  reflectionRange.value = next.reflection;
  gridOpacityRange.value = next.gridOpacity;
  playback.speed = Number(speedRange.value);
  speedValue.textContent = `${Number(speedRange.value).toFixed(2)}x`;
  startDelayValue.textContent = `${Number(startDelayRange.value).toFixed(1)}s`;
  fallSecondsValue.textContent = `${Number(fallSecondsRange.value).toFixed(1)}s`;
  syncAppearanceLabels();
}

function saveSettings() {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(getSettings()));
  } catch {
    // localStorage can be unavailable in strict browser modes.
  }
}

function loadSettings() {
  try {
    const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    applySettings(rawSettings ? JSON.parse(rawSettings) : DEFAULT_SETTINGS);
  } catch {
    applySettings(DEFAULT_SETTINGS);
  }
}

function applyAppearancePreset(presetName) {
  const customPresets = loadCustomAppearancePresets();
  const preset = APPEARANCE_PRESETS[presetName] || customPresets[presetName];
  if (!preset) return;

  applySettings({ ...getSettings(), ...preset });
  customPresetNameInput.value = customPresets[presetName]?.name || "";
  saveSettings();
  draw();
}

function getCurrentAppearanceSettings() {
  return Object.fromEntries(
    APPEARANCE_SETTING_KEYS.map((key) => [key, getSettings()[key]])
  );
}

function getDefaultAppearanceSettings() {
  return Object.fromEntries(
    APPEARANCE_SETTING_KEYS.map((key) => [key, DEFAULT_SETTINGS[key]])
  );
}

function loadCustomAppearancePresets() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_PRESETS_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCustomAppearancePresets(presets) {
  try {
    localStorage.setItem(CUSTOM_PRESETS_STORAGE_KEY, JSON.stringify(presets));
  } catch {
    fileSummary.textContent = "Nao foi possivel salvar presets neste navegador.";
  }
}

function saveCustomAppearancePreset() {
  const name = customPresetNameInput.value.trim();
  if (!name) {
    fileSummary.textContent = "Digite um nome para salvar a aparencia.";
    return;
  }

  const id = `custom:${slugifyPresetName(name)}`;
  const presets = loadCustomAppearancePresets();
  presets[id] = {
    name,
    ...getCurrentAppearanceSettings(),
  };
  saveCustomAppearancePresets(presets);
  renderPresetOptions(id);
  appearancePresetSelect.value = id;
  saveSettings();
  fileSummary.textContent = `Aparencia "${name}" salva.`;
}

function deleteSelectedCustomPreset() {
  const id = appearancePresetSelect.value;
  if (!id.startsWith("custom:")) {
    fileSummary.textContent = "Selecione um preset salvo para excluir.";
    return;
  }

  const presets = loadCustomAppearancePresets();
  const name = presets[id]?.name || "preset";
  delete presets[id];
  saveCustomAppearancePresets(presets);
  renderPresetOptions();
  appearancePresetSelect.value = "";
  customPresetNameInput.value = "";
  fileSummary.textContent = `Preset "${name}" excluido.`;
}

function renderPresetOptions(selectedValue = appearancePresetSelect.value) {
  const customPresets = loadCustomAppearancePresets();
  appearancePresetSelect.innerHTML = "";
  appearancePresetSelect.append(new Option("Escolher preset", ""));

  for (const [value, label] of [
    ["neon", "Neon"],
    ["crystal", "Crystal"],
    ["minimal", "Minimal"],
    ["warm", "Warm"],
  ]) {
    appearancePresetSelect.append(new Option(label, value));
  }

  const customEntries = Object.entries(customPresets).sort((a, b) =>
    a[1].name.localeCompare(b[1].name, "pt-BR")
  );

  if (customEntries.length > 0) {
    const group = document.createElement("optgroup");
    group.label = "Salvos";
    for (const [id, preset] of customEntries) {
      group.append(new Option(preset.name, id));
    }
    appearancePresetSelect.append(group);
  }

  appearancePresetSelect.value = selectedValue || "";
}

function slugifyPresetName(name) {
  const slug = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || `preset-${Date.now()}`;
}

function syncAppearanceLabels() {
  glowValue.textContent = `${glowRange.value}px`;
  trailValue.textContent = `${Math.round(Number(trailRange.value) * 100)}%`;
  particlesValue.textContent = `${Math.round(Number(particlesRange.value) * 100)}%`;
  reflectionValue.textContent = `${Math.round(Number(reflectionRange.value) * 100)}%`;
  gridOpacityValue.textContent = `${Math.round(Number(gridOpacityRange.value) * 100)}%`;
}

function getAppearance() {
  return {
    backgroundColor: backgroundColorInput.value,
    noteColorMode: noteColorModeSelect.value,
    noteColor: noteColorInput.value,
    gridColor: gridColorInput.value,
    hitLineColor: hitLineColorInput.value,
    noteShape: noteShapeSelect.value,
    glow: Number(glowRange.value),
    trail: Number(trailRange.value),
    particles: Number(particlesRange.value),
    reflection: Number(reflectionRange.value),
    gridOpacity: Number(gridOpacityRange.value),
  };
}

async function requestStartPlayback() {
  if (!song || playback.playing || pendingStart) return;

  stoppedBlank = false;
  if (!isVisualOnly() && !(await ensureAudioReady())) return;
  const delay = Number(startDelayRange.value);
  if (delay <= 0) {
    await startPlayback();
    return;
  }

  beginDelayedStart(delay);
}

async function requestRestartPlayback() {
  if (!song) return;

  stopPlayback();
  playback.position = 0;
  stoppedBlank = false;
  updateTransport();
  draw();
  await requestStartPlayback();
}

async function ensureAudioReady() {
  if (isVisualOnly()) return true;

  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      fileSummary.textContent = "Este navegador nao suporta Web Audio.";
      return false;
    }
    try {
      audioContext = new AudioContextClass({ latencyHint: "interactive" });
    } catch {
      audioContext = new AudioContextClass();
    }
    setupMasterAudio();
  }

  if (!masterGain) setupMasterAudio();
  await audioContext.resume();
  prewarmAudioGraph();
  return true;
}

function setupMasterAudio() {
  masterGain = audioContext.createGain();
  masterCompressor = audioContext.createDynamicsCompressor();

  masterGain.gain.value = 0.92;
  masterCompressor.threshold.value = -18;
  masterCompressor.knee.value = 18;
  masterCompressor.ratio.value = 5;
  masterCompressor.attack.value = 0.004;
  masterCompressor.release.value = 0.12;

  masterGain.connect(masterCompressor);
  masterCompressor.connect(audioContext.destination);
}

function prewarmAudioGraph() {
  if (!audioContext || !masterGain || audioGraphPrewarmed) return;

  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  gain.gain.setValueAtTime(0.00001, now);
  oscillator.connect(gain);
  gain.connect(masterGain);
  oscillator.start(now);
  oscillator.stop(now + 0.02);
  audioGraphPrewarmed = true;
}

function beginDelayedStart(delaySeconds) {
  clearPendingStart(false);
  pendingStart = true;
  pendingStartAt = performance.now() + delaySeconds * 1000;
  lastFrameTime = performance.now();
  particles = [];
  emittedNoteKeys = new Set();
  playPauseButton.textContent = "Cancelar";

  const updateCountdown = () => {
    const remaining = getPendingStartRemaining();
    fileSummary.textContent = `Comecando em ${remaining.toFixed(1)}s... foque a janela do jogo.`;
  };

  updateCountdown();
  pendingStartInterval = window.setInterval(updateCountdown, 100);
  pendingStartTimer = window.setTimeout(async () => {
    clearPendingStart(false);
    setSongSummary();
    await startPlayback();
  }, delaySeconds * 1000);
}

function clearPendingStart(restoreSummary = true) {
  if (pendingStartTimer) window.clearTimeout(pendingStartTimer);
  if (pendingStartInterval) window.clearInterval(pendingStartInterval);
  pendingStartTimer = 0;
  pendingStartInterval = 0;
  pendingStartAt = 0;

  if (pendingStart) {
    pendingStart = false;
    playPauseButton.textContent = playback.playing ? "Pausar" : "Tocar";
    if (restoreSummary) setSongSummary();
  }
}

function stopAndResetPlayback() {
  stopPlayback();
  playback.position = 0;
  stoppedBlank = true;
  particles = [];
  emittedNoteKeys = new Set();
  updateTransport();
  draw();
}

function isPausedMidSong() {
  return song && !playback.playing && playback.position > 0 && playback.position < song.duration;
}

function getPendingStartRemaining() {
  if (!pendingStart || !pendingStartAt) return 0;
  return Math.max(0, (pendingStartAt - performance.now()) / 1000);
}

function getVisualSongTime() {
  if (pendingStart) {
    return -getPendingStartRemaining();
  }
  return playback.playing ? getCurrentSongTime() : playback.position;
}

async function startPlayback() {
  if (!isVisualOnly() && !(await ensureAudioReady())) return;
  if (playback.position >= song.duration) playback.position = 0;

  stoppedBlank = false;
  playback.playing = true;
  playback.speed = Number(speedRange.value);
  playback.startedAt = getPlaybackClockTime() - playback.position / playback.speed;
  playback.scheduleUntil = playback.position;
  lastFrameTime = performance.now();
  if (playback.position === 0) {
    emittedNoteKeys = new Set();
    particles = [];
  }
  playPauseButton.textContent = "Pausar";
  if (!isVisualOnly()) scheduleNotes(true);
}

function pausePlayback() {
  clearPendingStart();
  playback.position = getCurrentSongTime();
  playback.playing = false;
  playPauseButton.textContent = "Tocar";
  clearScheduledNotes();
  updateTransport();
  draw();
}

function stopPlayback() {
  clearPendingStart();
  playback.playing = false;
  playback.position = 0;
  playback.scheduleUntil = 0;
  particles = [];
  emittedNoteKeys = new Set();
  playPauseButton.textContent = "Tocar";
  clearScheduledNotes();
}

function scheduleNotes(includeActive = false) {
  if (!song || !audioContext || isVisualOnly()) return;

  const current = getCurrentSongTime();
  const lookAheadSeconds = AUDIO_LOOKAHEAD_SECONDS;
  const from = includeActive ? current : Math.max(current, playback.scheduleUntil);
  const to = Math.min(song.duration, current + lookAheadSeconds * playback.speed);
  if (to <= from && !includeActive) return;

  for (const note of song.notes) {
    const startsInWindow = (includeActive ? note.start >= from : note.start > from) && note.start <= to;
    const alreadyActive = includeActive && note.start < current && note.end > current;
    if (!startsInWindow && !alreadyActive) continue;

    const startAt =
      audioContext.currentTime + Math.max(0, (note.start - current) / playback.speed);
    const remainingDuration = (note.end - Math.max(note.start, current)) / playback.speed;
    playback.scheduled.push(playSynthNote(note, startAt, remainingDuration));
  }

  playback.scheduleUntil = to;
}

function playSynthNote(note, startAt, duration) {
  const preset = getCurrentTimbrePreset(note);
  const oscillator = audioContext.createOscillator();
  const secondOscillator = preset.secondOscillator ? audioContext.createOscillator() : null;
  const gain = audioContext.createGain();
  const secondGain = secondOscillator ? audioContext.createGain() : null;
  const filter = audioContext.createBiquadFilter();

  oscillator.type = note.channel === 9 ? "triangle" : preset.oscillator;
  oscillator.frequency.value = midiToFrequency(note.midi);
  oscillator.detune.value = preset.detune || 0;
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(note.channel === 9 ? 900 : preset.filter, startAt);
  const velocity = note.velocity / 127;
  const volume = Math.min(0.18, preset.volume * (0.45 + velocity * 0.75));
  const playableDuration = Math.max(0.035, duration);
  const attackSeconds = Math.min(preset.attack, playableDuration * 0.45);
  const decaySeconds = Math.min(preset.decay, Math.max(0.001, playableDuration - attackSeconds));
  const attackEnd = startAt + attackSeconds;
  const decayEnd = startAt + attackSeconds + decaySeconds;
  const noteEnd = startAt + playableDuration;
  const releaseEnd = noteEnd + preset.release;
  const sustainLevel = Math.max(0.0001, volume * preset.sustain);

  gain.gain.cancelScheduledValues(startAt);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, volume), attackEnd);
  gain.gain.exponentialRampToValueAtTime(sustainLevel, decayEnd);
  gain.gain.setValueAtTime(sustainLevel, noteEnd);
  gain.gain.exponentialRampToValueAtTime(0.0001, releaseEnd);

  oscillator.connect(filter);

  if (secondOscillator && secondGain) {
    secondOscillator.type = preset.secondOscillator;
    secondOscillator.frequency.value = midiToFrequency(note.midi) * (preset.secondRatio || 1);
    secondOscillator.detune.value = -(preset.detune || 0);
    secondGain.gain.setValueAtTime(preset.secondGain || 0.2, startAt);
    secondOscillator.connect(secondGain);
    secondGain.connect(filter);
  }

  filter.connect(gain);
  gain.connect(masterGain || audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(releaseEnd + 0.03);

  if (secondOscillator) {
    secondOscillator.start(startAt);
    secondOscillator.stop(releaseEnd + 0.03);
  }

  return {
    stop() {
      for (const source of [oscillator, secondOscillator].filter(Boolean)) {
        try {
          source.stop();
        } catch {
          // The source may already have finished.
        }
      }
    },
  };
}

function getCurrentTimbrePreset(note) {
  if (note.channel === 9) {
    return {
      oscillator: "triangle",
      secondOscillator: null,
      attack: 0.001,
      decay: 0.08,
      sustain: 0.08,
      release: 0.05,
      filter: 900,
      volume: 0.08,
      detune: 0,
    };
  }

  return TIMBRE_PRESETS[timbreSelect.value] || TIMBRE_PRESETS[DEFAULT_SETTINGS.timbre];
}

function clearScheduledNotes() {
  for (const source of playback.scheduled) {
    try {
      source.stop();
    } catch {
      // The source may already have finished.
    }
  }
  playback.scheduled = [];
  playback.scheduleUntil = playback.position;
}

function getCurrentSongTime() {
  if (!playback.playing) return playback.position;
  return Math.min(song.duration, (getPlaybackClockTime() - playback.startedAt) * playback.speed);
}

function getPlaybackClockTime() {
  return audioContext ? audioContext.currentTime : performance.now() / 1000;
}

function isVisualOnly() {
  return timbreSelect.value === "visualOnly";
}

function tick() {
  if (song && playback.playing) {
    const now = getCurrentSongTime();
    if (now >= song.duration) {
      playback.position = song.duration;
      playback.playing = false;
      playPauseButton.textContent = "Tocar";
      clearScheduledNotes();
    } else if (now + AUDIO_RESCHEDULE_THRESHOLD_SECONDS * playback.speed >= playback.scheduleUntil) {
      scheduleNotes();
    }
    updateTransport();
    draw();
  } else if (song && pendingStart) {
    draw();
  }

  requestAnimationFrame(tick);
}

function updateTransport() {
  if (!song) return;
  const now = playback.playing ? getCurrentSongTime() : playback.position;
  currentTimeLabel.textContent = formatTime(now);
  seekRange.value = String(Math.round((now / song.duration) * 1000));
}

function draw() {
  const rect = canvas.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.floor(rect.width * ratio));
  const height = Math.max(1, Math.floor(rect.height * ratio));

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  ctx.save();
  ctx.scale(ratio, ratio);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.fillStyle = "#0d0f12";
  ctx.fillRect(0, 0, rect.width, rect.height);

  if (!song) {
    ctx.restore();
    return;
  }

  if (viewMode === "falling") {
    const metrics = getFallingMetrics(rect.width, rect.height);
    drawFallingVisualizer(metrics, stoppedBlank);
  } else {
    const metrics = getRollMetrics(rect.width, rect.height);
    drawGrid(metrics);
    if (!stoppedBlank) drawNotes(metrics);
    drawPlayhead(metrics);
  }
  ctx.restore();
}

function getRollMetrics(width, height) {
  const padding = 16;
  const visibleMin = Math.max(0, song.minNote - 3);
  const visibleMax = Math.min(127, song.maxNote + 3);
  const noteSpan = visibleMax - visibleMin + 1;
  const rowHeight = Math.max(8, (height - padding * 2) / noteSpan);
  const contentHeight = rowHeight * noteSpan;
  const top = (height - contentHeight) / 2;
  const duration = Math.max(1, song.duration);
  const pxPerSecond = Math.max(width / duration, 42);
  const contentWidth = duration * pxPerSecond;
  const now = playback.playing ? getCurrentSongTime() : playback.position;
  const viewportOffset = Math.max(0, Math.min(contentWidth - width, now * pxPerSecond - width * 0.35));

  return {
    width,
    height,
    visibleMin,
    visibleMax,
    rowHeight,
    top,
    duration,
    pxPerSecond,
    viewportOffset,
  };
}

function drawGrid(metrics) {
  ctx.strokeStyle = "#1d222a";
  ctx.lineWidth = 1;

  for (let midi = metrics.visibleMin; midi <= metrics.visibleMax; midi += 1) {
    const y = noteToY(midi, metrics);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(metrics.width, y);
    ctx.stroke();
  }

  const secondsStep = metrics.duration > 90 ? 10 : metrics.duration > 25 ? 5 : 1;
  ctx.fillStyle = "#697383";
  ctx.font = "12px system-ui, sans-serif";
  ctx.textBaseline = "top";

  for (let second = 0; second <= metrics.duration; second += secondsStep) {
    const x = second * metrics.pxPerSecond - metrics.viewportOffset;
    if (x < -1 || x > metrics.width + 1) continue;
    ctx.strokeStyle = second % 10 === 0 ? "#3a414c" : "#252b34";
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, metrics.height);
    ctx.stroke();
    ctx.fillText(formatTime(second), x + 6, 8);
  }
}

function drawNotes(metrics) {
  const now = playback.playing ? getCurrentSongTime() : playback.position;
  const active = new Set();

  for (const note of song.notes) {
    const x = note.start * metrics.pxPerSecond - metrics.viewportOffset;
    const width = Math.max(3, note.duration * metrics.pxPerSecond);
    if (x + width < 0 || x > metrics.width) continue;

    const y = noteToY(note.midi, metrics) - metrics.rowHeight + 1;
    const height = Math.max(3, metrics.rowHeight - 2);
    const isActive = now >= note.start && now <= note.end;
    const color = CHANNEL_COLORS[note.channel % CHANNEL_COLORS.length];

    ctx.globalAlpha = isActive ? 1 : 0.78;
    ctx.fillStyle = color;
    roundedRect(ctx, x, y, width, height, 4);
    ctx.fill();

    if (isActive) active.add(note.midi);
  }

  ctx.globalAlpha = 1;
  highlightKeyboard(active, metrics);
}

function drawPlayhead(metrics) {
  const now = playback.playing ? getCurrentSongTime() : playback.position;
  const x = now * metrics.pxPerSecond - metrics.viewportOffset;
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, metrics.height);
  ctx.stroke();
}

function getFallingMetrics(width, height) {
  const keyboardHeight = Math.min(106, Math.max(72, height * 0.17));
  const hitLine = height - keyboardHeight;
  const fallSeconds = Number(fallSecondsRange.value);
  const visibleMin = Math.max(0, song.minNote - 2);
  const visibleMax = Math.min(127, song.maxNote + 2);
  const firstWhite = previousWhiteKey(visibleMin);
  const lastWhite = nextWhiteKey(visibleMax);
  const firstWhiteIndex = whiteKeyIndex(firstWhite);
  const whiteCount = whiteKeyIndex(lastWhite) - firstWhiteIndex + 1;
  const whiteWidth = width / whiteCount;
  const fallSpeed = Math.max(80, (hitLine - 18) / fallSeconds);

  return {
    width,
    height,
    keyboardHeight,
    hitLine,
    fallSeconds,
    visibleMin,
    visibleMax,
    firstWhite,
    lastWhite,
    firstWhiteIndex,
    whiteCount,
    whiteWidth,
    fallSpeed,
  };
}

function drawFallingVisualizer(metrics, blankNotes = false) {
  const frameNow = performance.now();
  const deltaSeconds = Math.min(0.05, Math.max(0, (frameNow - lastFrameTime) / 1000));
  lastFrameTime = frameNow;
  const now = getVisualSongTime();
  const active = new Map();
  const appearance = getAppearance();

  drawFallingBackground(metrics, appearance);
  if (!blankNotes) {
    drawFallingNotes(metrics, now, active, appearance);
    updateParticles(deltaSeconds);
    drawParticles(appearance);
  }
  drawFallingKeyboard(metrics, active, appearance);
}

function drawFallingBackground(metrics, appearance) {
  const gradient = ctx.createLinearGradient(0, 0, 0, metrics.height);
  gradient.addColorStop(0, mixHex(appearance.backgroundColor, "#ffffff", 0.04));
  gradient.addColorStop(0.72, appearance.backgroundColor);
  gradient.addColorStop(1, "#000000");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, metrics.width, metrics.height);

  ctx.strokeStyle = rgba(appearance.gridColor, appearance.gridOpacity);
  ctx.lineWidth = 1;
  for (let index = 0; index <= metrics.whiteCount; index += 1) {
    const x = index * metrics.whiteWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, metrics.hitLine);
    ctx.stroke();
  }

  ctx.strokeStyle = rgba(appearance.hitLineColor, 0.66);
  ctx.shadowColor = appearance.hitLineColor;
  ctx.shadowBlur = appearance.glow * 0.45;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, metrics.hitLine);
  ctx.lineTo(metrics.width, metrics.hitLine);
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function drawFallingNotes(metrics, now, active, appearance) {
  const topPadding = 12;
  const maxY = metrics.hitLine + metrics.keyboardHeight + 24;

  for (const note of song.notes) {
    const bottom = metrics.hitLine - (note.start - now) * metrics.fallSpeed;
    const top = bottom - Math.max(14, note.duration * metrics.fallSpeed);
    if (bottom < -topPadding || top > maxY) continue;
    if (note.midi < metrics.visibleMin || note.midi > metrics.visibleMax) continue;

    const isActive = now >= note.start && now <= note.end;
    const noteRect = getFallingNoteRect(note.midi, metrics);
    const lanePadding = Math.max(1, Math.min(4, noteRect.width * 0.12));
    const x = noteRect.x + lanePadding;
    const width = Math.max(4, noteRect.width - lanePadding * 2);
    const color = getNoteColor(note, appearance);
    const radius = getNoteRadius(width, bottom - top, appearance.noteShape);

    if (appearance.reflection > 0) {
      drawNoteReflection(x, top, width, bottom - top, metrics, color, radius, appearance);
    }

    if (appearance.trail > 0) {
      drawNoteTrail(x, top, width, bottom - top, color, radius, appearance);
    }

    ctx.globalAlpha = isActive ? 1 : 0.9;
    ctx.shadowColor = color;
    ctx.shadowBlur = appearance.glow;
    ctx.fillStyle = color;
    drawNoteShape(ctx, x, top, width, bottom - top, radius, appearance.noteShape);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (isActive) {
      active.set(note.midi, color);
      maybeEmitParticles(note, x + width / 2, metrics.hitLine, color, now, appearance);
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#ffffff";
      roundedRect(ctx, x - 2, metrics.hitLine - 5, width + 4, 10, 5);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

function drawFallingKeyboard(metrics, active, appearance) {
  ctx.fillStyle = rgba(mixHex(appearance.backgroundColor, "#111827", 0.52), 0.88);
  ctx.fillRect(0, metrics.hitLine, metrics.width, metrics.keyboardHeight);

  for (let midi = metrics.firstWhite; midi <= metrics.lastWhite; midi += 1) {
    if (isBlackKey(midi) || midi < metrics.visibleMin || midi > metrics.visibleMax) continue;
    drawFallingKey(midi, metrics, active, false);
  }

  for (let midi = metrics.visibleMin; midi <= metrics.visibleMax; midi += 1) {
    if (!isBlackKey(midi)) continue;
    drawFallingKey(midi, metrics, active, true);
  }
}

function drawFallingKey(midi, metrics, active, black) {
  const rect = getFallingKeyRect(midi, metrics);
  const centerX = rect.x + rect.width / 2;
  const width = rect.width;
  const height = black ? metrics.keyboardHeight * 0.58 : metrics.keyboardHeight - 1;
  const x = rect.x;
  const y = metrics.hitLine + 1;
  const activeColor = active.get(midi);
  const pressed = Boolean(activeColor);

  ctx.globalAlpha = pressed ? 0.96 : black ? 0.94 : 0.88;
  ctx.fillStyle = pressed ? activeColor : black ? "#090c12" : "#e8edf2";
  roundedRect(ctx, x, y, width, height, black ? 4 : 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.strokeStyle = black ? "rgba(255,255,255,0.24)" : "rgba(0,0,0,0.3)";
  ctx.lineWidth = black ? 1.2 : 1;
  roundedRect(ctx, x, y, width, height, black ? 4 : 2);
  ctx.stroke();

  if (!black && (metrics.whiteWidth >= 28 || midi % 12 === 0)) {
    ctx.fillStyle = pressed ? "#07120f" : "#20242b";
    ctx.font = `${metrics.whiteWidth >= 32 ? 12 : 10}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(noteName(midi), centerX, metrics.height - 8);
  }
}

function getFallingNoteRect(midi, metrics) {
  const keyRect = getFallingKeyRect(midi, metrics);
  const width = isBlackKey(midi) ? keyRect.width * 0.78 : keyRect.width * 0.74;
  return {
    x: keyRect.x + (keyRect.width - width) / 2,
    width,
  };
}

function getFallingKeyRect(midi, metrics) {
  if (!isBlackKey(midi)) {
    const index = whiteKeyIndex(midi) - metrics.firstWhiteIndex;
    return {
      x: index * metrics.whiteWidth,
      width: Math.ceil(metrics.whiteWidth) + 1,
    };
  }

  const previousWhite = previousWhiteKey(midi - 1);
  const centerX = (whiteKeyIndex(previousWhite) - metrics.firstWhiteIndex + 1) * metrics.whiteWidth;
  const width = Math.max(8, metrics.whiteWidth * 0.58);
  return {
    x: centerX - width / 2,
    width,
  };
}

function drawNoteTrail(x, y, width, height, color, radius, appearance) {
  const copies = Math.ceil(appearance.trail * 5);
  const spacing = 10 + appearance.trail * 22;
  for (let index = copies; index >= 1; index -= 1) {
    const alpha = (appearance.trail * 0.16) / index;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    drawNoteShape(ctx, x, y - spacing * index, width, height, radius, appearance.noteShape);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawNoteReflection(x, y, width, height, metrics, color, radius, appearance) {
  const reflectedTop = metrics.hitLine + (metrics.hitLine - (y + height));
  const reflectedHeight = Math.min(height, metrics.keyboardHeight * 0.9);
  if (reflectedTop > metrics.height || reflectedTop + reflectedHeight < metrics.hitLine) return;

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, metrics.hitLine, metrics.width, metrics.keyboardHeight);
  ctx.clip();
  ctx.globalAlpha = appearance.reflection * 0.32;
  ctx.fillStyle = color;
  drawNoteShape(ctx, x, reflectedTop, width, reflectedHeight, radius, appearance.noteShape);
  ctx.fill();
  ctx.restore();
}

function maybeEmitParticles(note, x, y, color, now, appearance) {
  if (!playback.playing || appearance.particles <= 0 || now - note.start > 0.08) return;

  const key = `${note.track}:${note.channel}:${note.midi}:${note.start.toFixed(4)}`;
  if (emittedNoteKeys.has(key)) return;
  emittedNoteKeys.add(key);

  const count = Math.round(appearance.particles * 18);
  for (let index = 0; index < count; index += 1) {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI;
    const speed = 35 + Math.random() * 130;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.45 + Math.random() * 0.55,
      maxLife: 1,
      size: 1.4 + Math.random() * 3.2,
      color,
    });
  }

  if (particles.length > 900) {
    particles = particles.slice(-900);
  }
}

function updateParticles(deltaSeconds) {
  particles = particles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * deltaSeconds,
      y: particle.y + particle.vy * deltaSeconds,
      vy: particle.vy + 180 * deltaSeconds,
      life: particle.life - deltaSeconds,
    }))
    .filter((particle) => particle.life > 0);
}

function drawParticles(appearance) {
  if (appearance.particles <= 0) return;

  for (const particle of particles) {
    const alpha = Math.min(1, Math.max(0, particle.life / particle.maxLife)) * appearance.particles;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = particle.color;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = appearance.glow * 0.5;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}

function getNoteColor(note, appearance) {
  if (appearance.noteColorMode === "single") return appearance.noteColor;
  if (appearance.noteColorMode === "velocity") {
    return mixHex("#1c4ed8", appearance.noteColor, note.velocity / 127);
  }
  return CHANNEL_COLORS[note.channel % CHANNEL_COLORS.length];
}

function getNoteRadius(width, height, shape) {
  if (shape === "square" || shape === "diamond") return 0;
  if (shape === "pill") return Math.min(width, height) / 2;
  return Math.min(7, width / 3, height / 3);
}

function drawNoteShape(context, x, y, width, height, radius, shape) {
  if (shape === "diamond") {
    context.beginPath();
    context.moveTo(x + width / 2, y);
    context.lineTo(x + width, y + height / 2);
    context.lineTo(x + width / 2, y + height);
    context.lineTo(x, y + height / 2);
    context.closePath();
    return;
  }

  roundedRect(context, x, y, width, height, radius);
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex, alpha) {
  const color = hexToRgb(hex);
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
}

function mixHex(fromHex, toHex, amount) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);
  const t = Math.max(0, Math.min(1, amount));
  const r = Math.round(from.r + (to.r - from.r) * t);
  const g = Math.round(from.g + (to.g - from.g) * t);
  const b = Math.round(from.b + (to.b - from.b) * t);
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function renderKeyboard() {
  keyboard.innerHTML = "";
  if (!song || viewMode === "falling") return;

  const height = keyboard.clientHeight;
  const metrics = getRollMetrics(1, height);

  for (let midi = metrics.visibleMin; midi <= metrics.visibleMax; midi += 1) {
    if (midi % 12 !== 0 && midi !== song.minNote && midi !== song.maxNote) continue;
    const label = document.createElement("span");
    label.className = `keyLabel ${isBlackKey(midi) ? "black" : ""}`;
    label.style.top = `${noteToY(midi, metrics) - metrics.rowHeight / 2}px`;
    label.textContent = noteName(midi);
    keyboard.appendChild(label);
  }
}

function highlightKeyboard(active, metrics) {
  const labels = keyboard.querySelectorAll(".keyLabel");
  for (const label of labels) {
    label.style.color = active.has(noteNumber(label.textContent)) ? "#2fd1a6" : "";
  }
}

function noteToY(midi, metrics) {
  return metrics.top + (metrics.visibleMax - midi + 1) * metrics.rowHeight;
}

function roundedRect(context, x, y, width, height, radius) {
  const maxRadius = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + maxRadius, y);
  context.lineTo(x + width - maxRadius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + maxRadius);
  context.lineTo(x + width, y + height - maxRadius);
  context.quadraticCurveTo(x + width, y + height, x + width - maxRadius, y + height);
  context.lineTo(x + maxRadius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - maxRadius);
  context.lineTo(x, y + maxRadius);
  context.quadraticCurveTo(x, y, x + maxRadius, y);
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function noteName(midi) {
  return `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
}

function noteNumber(name) {
  const match = /^([A-G]#?)(-?\d+)$/.exec(name);
  if (!match) return -1;
  return NOTE_NAMES.indexOf(match[1]) + (Number(match[2]) + 1) * 12;
}

function isWhiteKey(midi) {
  return !isBlackKey(midi);
}

function isBlackKey(midi) {
  return [1, 3, 6, 8, 10].includes(midi % 12);
}

function previousWhiteKey(midi) {
  let note = Math.max(0, midi);
  while (note > 0 && !isWhiteKey(note)) note -= 1;
  return note;
}

function nextWhiteKey(midi) {
  let note = Math.min(127, midi);
  while (note < 127 && !isWhiteKey(note)) note += 1;
  return note;
}

function whiteKeyIndex(midi) {
  const octave = Math.floor(midi / 12);
  const pitch = midi % 12;
  const whiteOffsetsBefore = [0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6];
  return octave * 7 + whiteOffsetsBefore[pitch];
}

function formatTime(seconds) {
  const safeSeconds = Math.max(0, seconds || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds - minutes * 60;
  return `${minutes}:${remainder.toFixed(1).padStart(4, "0")}`;
}
