import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { isFolderPath } from "../util/path"

interface Options {
  links: Record<string, string>
}

const FEEDBACK_EMAIL = "lynhatkhoa@tamu.edu"

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const slug = fileData.slug ?? ""
    const isContentPage = !isFolderPath(slug) && !slug.startsWith("tags/") && slug !== "404"
    const title = fileData.frontmatter?.title ?? ""
    const feedbackHref = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(`Feedback for ${title}`)}`

    return (
      <footer class={`${displayClass ?? ""}`}>
        {isContentPage && (
          <blockquote class="callout info" data-callout="info">
            <div class="callout-title">
              <div class="callout-icon"></div>
              <div class="callout-title-inner">
                Spot an error or have a better tip? This page gets better every time a student
                improves it. <a href={feedbackHref}>Send feedback</a>
              </div>
            </div>
          </blockquote>
        )}
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
