import AOS from "aos/dist/aos"
import "aos/dist/aos.css"

export default({ app }, inject) => {
    app.AOS = new AOS.init();
}