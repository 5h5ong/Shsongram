import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { adjectives, nouns } from './words';

import nodemailer from 'nodemailer';
import mgTransport from 'nodemailer-mailgun-transport';
import jwt from 'jsonwebtoken';

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_key: process.env.MAILGUN_APIKEY,
      domain: process.env.NAILGUN_DOMAIN
    }
  };
  const client = nodemailer.createTransport(mgTransport(options));
  return client.sendMail(email);
};

export const sendSecretMail = (address, secret) => {
  const email = {
    from: 'admin@shsongram.com',
    to: address,
    subject: '🔐 Login을 위한 secret key를 전해드립니다. 🔐',
    html: `안녕하세요. 당신의 login secret key는 다음과 같습니다. [ ${secret} ] <br/> 해당 secret key는 웹사이트에 login할 때 필요합니다.`
  };
  return sendMail(email);
};

export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);
