import Pointers, { PointerData } from "../../utility_components/Pointers/Pointers";
import styles from "./AboutAnimals.module.css";

export default function AboutAnimals() {

  const PointersData: PointerData[] = [
    {
      imgUrl: "/assets/animals/fox.webp",
      imgAlt: "fox",
      title: "Fox",
      description: "Foxes are small-to-medium-sized omnivorous mammals. They have a flattened skull upright, triangular ears, a pointed, slightly upturned snout, and a long, bushy tail (\"brush\"). Foxes live on every continent except Antarctica."
    },
    {
      imgUrl: "/assets/animals/panda.webp",
      imgAlt: "panda",
      title: "Panda",
      description: "The giant panda is a bear species endemic to China. It is characterised by its black-and-white coat and rotund body. Adult individuals average 100 to 115kg, and are typically 1.2 to 1.9 long. Its diet consists almost entirely of bamboo."
    },
    {
      imgUrl: "/assets/animals/wolverine.webp",
      imgAlt: "wolverine",
      title: "Wolverine",
      description: "The wolverine is a muscular carnivore and a solitary animal. They have a reputation for ferocity and strength out of proportion to its size, with the documented ability to kill prey many times larger than itself. Wolverines live primarily in the Northern borealforests and tundra."
    }
  ];

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>About Animals</h2>
      <Pointers id="animals" pointersData={PointersData}/>
    </section>
  )
}