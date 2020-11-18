import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const setupList = [
  {
    id: 1,
    nickname: "The Natural",
    imgUrl:
      "https://images-projectx.nyc3.digitaloceanspaces.com/the-natural.jpg",
  },
  {
    id: 2,
    nickname: "The Essential",
    imgUrl:
      "https://images-projectx.nyc3.digitaloceanspaces.com/the-essential.jpg",
  },
  {
    id: 3,
    nickname: "The Soother",
    imgUrl:
      "https://images-projectx.nyc3.digitaloceanspaces.com/the-soother.jpg",
  },
  {
    id: 4,
    nickname: "The Modern",
    imgUrl:
      "https://images-projectx.nyc3.digitaloceanspaces.com/the-modern.jpg",
  },
];

const Setups = () => {
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {setupList.map((setup) => (
          <Grid item key={setup.id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={setup.imgUrl}
                title={setup.nickname}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {setup.nickname}
                </Typography>
                <Typography>
                  This is a media card. You can use this section to describe the
                  content.
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
                <Button size="small" color="primary">
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Setups;
