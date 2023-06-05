import type { IconPack } from "@fortawesome/fontawesome-svg-core";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "bootstrap-icons/font/bootstrap-icons.scss";
import "@/assets/scss/index.scss";

library.add(far as IconPack, fas as IconPack, fab as IconPack);

export { FontAwesomeIcon };
