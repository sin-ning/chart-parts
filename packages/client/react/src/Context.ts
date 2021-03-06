/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { SceneNodeBuilder } from '@chart-parts/builder'

export const {
	Consumer: SceneNodeBuilderConsumer,
	Provider: SceneNodeBuilderProvider,
} = React.createContext<SceneNodeBuilder>(new SceneNodeBuilder())
