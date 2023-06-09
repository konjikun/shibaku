import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import * as React from 'react'
import type { FormEvent } from 'react'
import axios from 'axios'
import Router from 'next/router'
import firebase from '@firebase/app-compat'
import 'firebase/compat/auth'
import { auth } from '../server/components/lib/firebase/firebase'
import { FirebaseError, getApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getIdToken,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const theme = createTheme()

// eslint-disable-next-line react-hooks/rules-of-hooks
const router = Router

//usestateでindivdata

//ボタンが押されたときの処理
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  //----------formのデータを取り出す
  const data = new FormData(e.currentTarget)
  const indivData = {
    email: data.get('email'),
    password: data.get('password'),
  }

  //--------user情報をserverに送信
  function sendToServer() {
    axios
      .post('https://shibaku.herokuapp.com/login', indivData)
      .then(async () => {
        console.log('postの成功。')
        router.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function authenticate() {
    try {
      // メールアドレスとパスワードを使って認証
      await signInWithEmailAndPassword(
        auth,
        indivData.email as string,
        indivData.password as string
      )

      // IDトークン（JWT）取得
      /*
      const token = await firebase
        .auth()
        .currentUser.getIdToken(true)
        .then(() => {
          console.log(token)
        })
      console.log(token)

      // ローカルストレージに保存
      localStorage.setItem('token', token)
*/
      // 認証後のページに遷移
      this.$router.push('/')
    } catch (e) {
      // 認証エラー、トークン取得エラー時
      console.log(e)
    }
  }

  authenticate()
  sendToServer()
}

export default function SignIn() {
  /*
  }
  /*firebaseの認証
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      await sendEmailVerification(userCredential.user)
    } catch (event) {
      if (event instanceof FirebaseError) {
        console.log(event)
      }


          ---------------------------------------------------
    */

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="mail"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      value="allowExtraEmails"
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid
              container
              justifyContent="flex-end"
            >
              <Grid item>
                <a href="/rooting/signup">まだアカウントをお持ちでない方</a>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
