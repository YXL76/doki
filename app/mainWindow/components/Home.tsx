import path from 'path';
import React from 'react';
import { shell } from 'electron';
import '../app.global.scss';
import fs from 'fs';
import styles from './Home.scss';

type Props = {
  appdataPath: number;
};

/* const appdataFolder = path.join(
  process.env.LOCALAPPDATA ||
    process.env.APPDATA ||
    process.env.HOME ||
    process.env.HOMEPATH ||
    process.env.USERPROFILE ||
    __dirname,
  'doki'
);

const appdataSettingFile = path.join(appdataFolder, 'setting.json'); */

export default function Home(props: Props) {
  const { appdataPath } = props;

  const icon = [
    {
      src: 'C:\\Users\\chenx\\Desktop\\test.png',
      target: 'C:\\Program Files\\Notepad++\\notepad++.exe',
      uuid: '1'
    }
  ];

  const imgStyle = {
    width: '32px',
    height: '32px',
    margin: '0 16px'
  };

  const renderIcon = icon.map(item => (
    <button
      className={styles.btn}
      key={item.uuid}
      type="button"
      onClick={() => {
        console.log(appdataPath);
        // shell.openItem(item.target);
        /* fs.readdir(appdataFolder, err => {
          if (err) {
            fs.mkdirSync(appdataFolder);
          }
          fs.writeFileSync(appdataSettingFile, '');
        }); */
      }}
    >
      <img
        alt={item.target}
        className={styles.icon}
        src={item.src}
        style={imgStyle}
      />
    </button>
  ));

  return (
    <div
      className={`flex content-center items-center ${styles.container}`}
      data-tid="container"
    >
      {renderIcon}
    </div>
  );
}
