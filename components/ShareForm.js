import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import UndoIcon from "@material-ui/icons/Undo";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(0, 2, 0, 0),
  },
  input: {
    display: "none",
  },
}));

const ValidationSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(3, "Must be 3 characters or more")
    .max(30, "Must be 30 characters or less")
    .required("Required"),
});

const hanldeOnCancel = () => {
  console.log("cancel");
};
const onChangeHandlerFile = (event) => {
  const data = {
    file: event.target.files[0],
  };
  //dispatch(uploadImage(data));
};

function ShareForm() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      nickname: null,
    },
  });

  return (
    <div className={classes.root}>
      <Card variant="outlined">
        <CardContent>
          <form
            noValidate
            onSubmit={handleSubmit((data) => {
              handleOnSubmit(data);
            })}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  autoFocus
                  label="Nickname"
                  id="nickname"
                  name="nickname"
                  inputRef={register}
                  error={!!errors?.nickname}
                  helperText={errors?.nickname?.message}
                />
              </Grid>
              <input
                accept="image/jpeg"
                className={classes.input}
                id="contained-button-file"
                type="file"
                name="file"
                onChange={onChangeHandlerFile}
              />
              <label htmlFor="contained-button-file">
                <IconButton
                  className={classes.uploadButton}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  <CameraAltIcon />
                </IconButton>
              </label>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className={classes.submit}
                  startIcon={<SaveIcon />}
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<UndoIcon />}
                  onClick={hanldeOnCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShareForm;
