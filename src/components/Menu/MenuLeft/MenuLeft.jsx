////// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import "./style.scss";

////// components
import SearchShop from "./SearchShop/SearchShop";
import { FormControlLabel, Switch, styled } from "@mui/material";

////// imgs
import plus from "../../../assets/icons/plus-square.svg";
import minus from "../../../assets/icons/minus-square.svg";

////// fns
import { updateListTA } from "../../../store/reducers/requestSlice";
import { editListAgents } from "../../../store/reducers/requestSlice";
import { searchActiveOrdersTA } from "../../../helpers/searchActiveOrdersTA";

const Android12Switch = styled(Switch)(() => ({
  paddingBottom: 10,
  paddingTop: 10,
  paddingRight: 11,
  paddingLeft: 9,

  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 14,
    height: 14,
    margin: 2,
    marginTop: 3,
    background: "#fff",
  },
}));

const MenuLeft = () => {
  const dispatch = useDispatch();

  const { listWorkshop, listTA } = useSelector((state) => state.requestSlice);
  const [look, setLook] = useState(true);

  const onChange = (e, guid) => {
    dispatch(editListAgents(guid));
    dispatch(updateListTA({ guid }));
  };

  return (
    <div className="menuLeft">
      <div className="menuLeft__inner">
        <SearchShop />
        <div className="title" onClick={() => setLook(!look)}>
          <h2>Торговые агенты</h2>
          <button>
            <img src={look ? minus : plus} alt="-" />
          </button>
        </div>
        <ul className={`content ${look ? "show" : ""}`}>
          {listTA?.map((item) => (
            <li key={item?.guid}>
              <FormControlLabel
                control={<Android12Switch />}
                label={item?.fio}
                checked={item?.bool}
                onChange={(e) => onChange(e, item?.guid)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuLeft;
