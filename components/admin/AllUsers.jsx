import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import { toast } from "react-toastify";
import { getAdminUsers, deleteUser } from "../../redux/actions/userActions.jsx";
import { DELETE_USER_RESET } from "../../redux/types/userTypes.jsx";
import styles from "../../styles/style.jsx";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@material-ui/core";
import EditSharpIcon from "@material-ui/icons/EditSharp";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";

export default function AllUsers() {
  const style = styles();
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAdminUsers());

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      toast.erroe(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      router.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, deleteError, isDeleted]);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className={style.dashboardSection}>
      <Grid container spacing={1} className="pb-3">
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typography}>Users</Typography>
              <div className={style.gap}></div>
            </ListItem>
          </List>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography className={style.typographyMain}>
                Number of users
                <span style={{ paddingLeft: "15px" }}>
                  {users && users.length}
                </span>
              </Typography>
              <div className={style.gap}></div>
            </ListItem>
            <ListItem>
              {loading && <CircularProgress></CircularProgress>}
              {error && (
                <Typography className={style.error}>{error}</Typography>
              )}
            </ListItem>

            <ListItem>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>NAME</TableCell>
                      <TableCell>EMAIL</TableCell>
                      <TableCell>ROLE</TableCell>
                      <TableCell align="center">ACTIONS</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users &&
                      users.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user._id.substring(20, 24)}</TableCell>

                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>

                          <TableCell>
                            <Grid
                              container
                              spacing={0}
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Grid item md={6}>
                                <NextLink
                                  href={`/admin/users/${user._id}`}
                                  passHref
                                >
                                  <Button>
                                    <EditSharpIcon />
                                  </Button>
                                </NextLink>
                              </Grid>
                              <Grid item md={6}>
                                <Button
                                  onClick={() => deleteUserHandler(user._id)}
                                >
                                  <DeleteSharpIcon />
                                </Button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
