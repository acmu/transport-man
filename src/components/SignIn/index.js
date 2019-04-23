import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import { styles } from './styles';
import withRedirect from '#components/hoc/withRedirect';

class SignIn extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    uName: 'sd',
    pWord: 'xvc',
    snackbar: false,
  };

  handleFromSubmit = e => {
    e.preventDefault();
    const { pWord, uName } = this.state;

    console.log(`${uName} - ${pWord}`);

    const { history } = this.props;

    if (pWord === '123') {
      history.push('/');
    } else {
      this.setState({
        snackbar: true,
      });
    }
    // history.replace('/');
  };

  handleChangeState = (stateName, event) => {
    const val = event.target ? event.target.value : event;
    this.setState({
      [stateName]: val,
    });
  };

  handleClose = () => {
    this.setState({ snackbar: false });
  };

  render() {
    const { classes } = this.props;
    const { pWord, uName, snackbar } = this.state;

    return (
      <main className={classes.main}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            用户登陆
          </Typography>
          <form className={classes.form}>
            <FormControl margin='normal' required fullWidth>
              <InputLabel>用户名</InputLabel>
              <Input
                autoFocus
                value={uName}
                onChange={e => this.handleChangeState('uName', e)}
              />
            </FormControl>
            <FormControl margin='normal' required fullWidth>
              <InputLabel htmlFor='password'>密码</InputLabel>
              <Input
                type='password'
                value={pWord}
                onChange={e => this.handleChangeState('pWord', e)}
              />
            </FormControl>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              onClick={this.handleFromSubmit}
            >
              提 交
            </Button>
          </form>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={snackbar}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id='message-id'>您输入的用户名或密码错误！</span>}
        />
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);
