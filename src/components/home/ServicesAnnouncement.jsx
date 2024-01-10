import Announcement from "./ServicesAnnoun/Announcement";
import ServicesOptions from "./ServicesAnnoun/ServicesOptions";

function ServicesAnnouncement() {
  return (
    <div className="grid grid-cols-2 px-4">
      <ServicesOptions />
      <Announcement />
    </div>
  );
}

export default ServicesAnnouncement;
