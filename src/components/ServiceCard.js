import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import _ from "lodash";
// import nannyIn from "../img/nannyin.jpg";
// import nannyOut from "../img/nannyout.jpg";
const ServiceCard = (props) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(`search/${_.kebabCase(props.nannyType)}`);
  };

  //card styling
  const useStyles = makeStyles({
    card: {
      minWidth: "20%",
      maxWidth: "30%",
      maxHeight: 350,
      flex: 1,
      display: "flex",
      flexFlow: "wrap",
      alignContent: "center",
      borderRadius: "20px",
      justifyContent: "center",
      boxShadow: "-9px 25px 42px rgba(0, 0, 0, 0.3)",
      position: "relative",
    },
    textTitle: {
      textAlign: "center",
      fontWeight: "bolder",
    },
    textP: {
      textAlign: "center",
    },
  });
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <div className={`cardContainer${props.nannyType}`}>
        <CardContent>
          <Typography className={classes.textTitle} variant="h4" component="h4">
            {props.nannyType === "NannyIn"
              ? "Hire a nanny at your home"
              : "Bring your kids to a nanny's home"}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography className={classes.textP} variant="body1" component="p">
            {props.nannyType === "NannyIn"
              ? "Hire a professional nanny to come and take care of your kids inside your home vicinity"
              : "Bring your kids to one of our nannies that will take care of your children in her house"}
          </Typography>
        </CardContent>
      </div>

      <button className="findButton" onClick={handleClick}>
        Find
      </button>
    </Card>
  );
};

export default ServiceCard;
