import Typography from "@material-ui/core/Typography";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © WFH Setups"}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
