export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'service',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          { title: 'Wallpapers', value: 'wallpapers' },
          { title: 'Window Blinds', value: 'blinds' },
          { title: 'Flooring', value: 'flooring' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'subcategory',
      title: 'Subcategory',
      type: 'string',
      description: 'Specific type of service (e.g., 3D Wallpaper, Roman Blinds, Vinyl Flooring)'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Main Project Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'images',
      title: 'Additional Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show this project on the homepage',
      initialValue: false
    },
    {
      name: 'completedDate',
      title: 'Completion Date',
      type: 'date',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Completed', value: 'completed' },
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Planning', value: 'planning' }
        ]
      },
      initialValue: 'completed'
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'customerName',
      media: 'image'
    }
  },

  orderings: [
    {
      title: 'Completion Date, New',
      name: 'completedDateDesc',
      by: [
        {field: 'completedDate', direction: 'desc'}
      ]
    },
    {
      title: 'Completion Date, Old',
      name: 'completedDateAsc',
      by: [
        {field: 'completedDate', direction: 'asc'}
      ]
    }
  ]
}
