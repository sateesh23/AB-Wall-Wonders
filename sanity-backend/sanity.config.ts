import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'ab-wall-wonders',
  title: 'AB Wall Wonders CMS',

  projectId: process.env.VITE_SANITY_PROJECT_ID || 'g5scqowd',
  dataset: process.env.VITE_SANITY_DATASET || 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
