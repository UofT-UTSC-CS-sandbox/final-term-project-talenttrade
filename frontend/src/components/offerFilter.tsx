import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { selectedOffersType } from "../pages/viewPostsByCategory";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface OfferFilterProps {
  selectedOffers: selectedOffersType[];
  setSelectedOffers: (updatedList: selectedOffersType[]) => void;
}

const OfferFilter: React.FC<OfferFilterProps> = ({
  selectedOffers,
  setSelectedOffers,
}) => {
  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={offers}
      disableCloseOnSelect
      getOptionLabel={(option) => option.title}
      renderOption={(props, option, { selected }) => (
        <li key={option.title} {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filter By My Offerings"
          placeholder="Offers"
        />
      )}
      value={selectedOffers}
      onChange={(_event, newValue) => {
        // const offerTitles = newValue.map((offer) => offer.title);
        setSelectedOffers(newValue);
      }}
    />
  );
};

const offers = [
  { title: "Web Developer" },
  { title: "Graphic Design" },
  { title: "Plumber" },
  { title: "Gardener" },
];

export default OfferFilter;
