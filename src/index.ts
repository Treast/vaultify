#!/usr/bin/env node

import Config from './config';
import Core from './core';

Config.init();
Core.processFiles();
