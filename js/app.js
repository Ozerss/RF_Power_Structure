import { createAppState, loadAppData } from "./state.js";
import { initTabs } from "./tabs.js";
import { initTheme } from "./theme.js";
import { initHierarchy } from "./features/hierarchy.js";
import { initFlow } from "./features/flow.js";
import { initClans } from "./features/clans.js";
import { initMechanisms } from "./features/mechanisms.js";
import { initTimeline } from "./features/timeline.js";
import { initPersons } from "./features/persons.js";
import { initEconomics } from "./features/economics.js";
import { initPropaganda } from "./features/propaganda.js";
import { initTransit } from "./features/transit.js";
import { initConclusions } from "./features/conclusions.js";

const data = await loadAppData();
const state = createAppState(data);

initTabs(state);
initHierarchy(data.hierarchy);
initFlow(data.flow);
initClans(data.clans);
initMechanisms(data.mechanisms);
initTimeline(data.timeline);
initPersons(data.persons);
initEconomics(data.economics);
initPropaganda(data.propaganda);
initTransit(data.transit);
initConclusions(data.conclusions);
initTheme();
