import React from 'react';
import { shell } from 'electron';
import '../app.global.scss';
import styles from './Home.scss';

export default function Home() {
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
        shell.openItem(item.target);
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
