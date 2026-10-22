import { JsonLd } from '@/components/content/json-ld'
import { PageHeading } from '@/components/content/page-heading'
import { ProjectArchive } from '@/components/content/project-archive'
import { publishedProjects } from '@/data/projects'
import { buildMetadata } from '@/lib/metadata'
import { breadcrumbSchema, webPageSchema } from '@/lib/structured-data'

export const metadata = buildMetadata({
  title: 'Projects & Products · Faizyab Hussain',
  description:
    'A complete archive of the products, developer tools, web applications and experiments built by Faizyab Hussain, with honest status labels for each one.',
  path: '/projects',
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: '/projects',
          name: 'Projects & Products',
          description:
            'The complete project archive: products, developer tools, web applications and experiments.',
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ])}
      />

      <div className="measure">
        <div className="pt-12 sm:pt-16">
          <PageHeading
            eyebrow="Projects"
            title="Project archive"
            description="Everything I have built that is worth documenting, whether it is a working product, a developer tool, a practice build, or an idea that has not been built yet. The status of each one is stated honestly, including when something is still only a concept."
          />
        </div>

        <div className="mt-10">
          <ProjectArchive projects={publishedProjects} />
        </div>
      </div>
    </>
  )
}
