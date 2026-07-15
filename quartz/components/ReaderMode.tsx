// @ts-ignore
import { BookOpen } from "lucide-preact"
import readerModeScript from "./scripts/readermode.inline"
import styles from "./styles/readermode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const ReaderMode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <button class={classNames(displayClass, "readermode")}> 
      <BookOpen
        class="readerIcon"
        size={20}
        strokeWidth={1.5}
        aria-label={i18n(cfg.locale).components.readerMode.title}
      />
    </button>
  )
}

ReaderMode.beforeDOMLoaded = readerModeScript
ReaderMode.css = styles

export default (() => ReaderMode) satisfies QuartzComponentConstructor
