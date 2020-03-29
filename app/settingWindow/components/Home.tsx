/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ipcRenderer } from 'electron';
import '../app.global.scss';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import Slider from '@material-ui/core/Slider';
import styles from './Home.scss';

type Props = {
  setTabIndex: (arg0: number) => void;
  setSettings: (arg0: object) => void;
  tabIndex: number;
  switchValue: object;
  radioValue: object;
  sliderValue: object;
};

export default function Home(props: Props) {
  const {
    setTabIndex,
    setSettings,
    tabIndex,
    switchValue,
    radioValue,
    sliderValue
  } = props;

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _ = { [event.target.name]: event.target.checked };
    setSettings(_);
    ipcRenderer.send('SWToM-setS', _);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _ = { [event.target.name]: (event.target as HTMLInputElement).value };
    setSettings(_);
    ipcRenderer.send('SWToM-setS', _);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (event.target.attributes['aria-labelledby']) {
      const { value } = event.target.attributes['aria-labelledby'];
      const _ = { [value]: newValue };
      setSettings(_);
      ipcRenderer.send('SWToM-setS', _);
    }
  };

  type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
    className: string;
  };

  function TabPanel(tabPanelProps: TabPanelProps) {
    const { children, value, index, className } = tabPanelProps;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        className={className}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

  type FormSwitchProps = {
    name: string;
    label: string;
  };

  function FormSwitch(formSwitchProps: FormSwitchProps) {
    const { name, label } = formSwitchProps;

    return (
      <FormControlLabel
        // eslint-disable-next-line prettier/prettier
        control={(
          <Switch
            color="primary"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            checked={(switchValue as any)[name]}
            onChange={handleSwitchChange}
            name={name}
          />
          // eslint-disable-next-line prettier/prettier
                )}
        label={label}
      />
    );
  }

  type FormRadioProps = {
    legend: string;
    name: string;
    item: {
      value: string;
      label: string;
    }[];
  };

  function FormRadio(formRadioProps: FormRadioProps) {
    const { legend, name, item } = formRadioProps;

    const renderItem = item.map(({ value, label }) => {
      return (
        <FormControlLabel
          key={value}
          value={value}
          control={<Radio color="primary" />}
          label={label}
        />
      );
    });

    return (
      <FormControl component="fieldset">
        <FormLabel component="legend" color="primary">
          {legend}
        </FormLabel>
        <RadioGroup
          aria-label={name}
          name={name}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value={(radioValue as any)[name]}
          onChange={handleRadioChange}
        >
          {renderItem}
        </RadioGroup>
      </FormControl>
    );
  }

  type FormSliderProps = {
    legend: string;
    item: {
      label: string;
      name: string;
      max: number;
      min: number;
      unit: string;
    }[];
  };

  function FormSlider(formSliderProps: FormSliderProps) {
    const { legend, item } = formSliderProps;

    const renderItem = item.map(({ label, name, max, min, unit }) => {
      return (
        <div className="flex items-center" key={name}>
          <div className={styles['slider-label-width']}>{label}</div>
          <Slider
            aria-labelledby={name}
            max={max}
            min={min}
            step={1}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            defaultValue={(sliderValue as any)[name]}
            valueLabelDisplay="auto"
            onChangeCommitted={handleSliderChange}
          />
          <div className={styles['slider-label-width']}>
            {`${(sliderValue as any)[name]}${unit}`}
          </div>
        </div>
      );
    });

    return (
      <FormControl component="fieldset" className={styles['slider-width']}>
        <FormLabel component="legend" color="primary">
          {legend}
        </FormLabel>
        {renderItem}
      </FormControl>
    );
  }

  return (
    <div>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab label="常观" />
        <Tab label="个性化" />
        <Tab label="图标管理" />
      </Tabs>
      <TabPanel value={tabIndex} index={0} className={styles.root}>
        <Grid container spacing={2}>
          <Grid item xs={6} className="flex content-center">
            <FormSwitch name="autostart" label="开机启动" />
          </Grid>
          <Grid item xs={6} className="flex content-center">
            <FormSwitch name="notification" label="显示托盘图标" />
          </Grid>
          <Grid item xs={4} className="flex content-center">
            <FormRadio
              legend="面板位置"
              name="panelPosition"
              item={[
                {
                  value: 'top',
                  label: '屏幕顶部'
                },
                {
                  value: 'bottom',
                  label: '屏幕底部'
                },
                {
                  value: 'left',
                  label: '屏幕左侧'
                },
                {
                  value: 'right',
                  label: '屏幕右侧'
                }
              ]}
            />
          </Grid>
          <Grid item xs={4} className="flex content-center">
            <FormRadio
              legend="面板层次"
              name="panelLevel"
              item={[
                {
                  value: 'default',
                  label: '系统默认'
                },
                {
                  value: 'top',
                  label: '始终置顶'
                }
              ]}
            />
          </Grid>
          <Grid item xs={4} className="flex content-center">
            <FormRadio
              legend="呼出热键"
              name="callShortcut"
              item={[
                {
                  value: 'none',
                  label: '无'
                },
                {
                  value: 'Ctrl+Ctrl',
                  label: '双击Ctrl'
                },
                {
                  value: 'Option+Z',
                  label: 'Win+Z'
                }
              ]}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={1} className={styles.root}>
        <Grid container spacing={2}>
          <Grid item xs={6} className="flex content-center">
            <FormSlider
              legend="图标设置"
              item={[
                {
                  label: '大小',
                  name: 'iconSize',
                  max: 128,
                  min: 8,
                  unit: 'px'
                },
                {
                  label: '不透明度',
                  name: 'iconOpacity',
                  max: 100,
                  min: 0,
                  unit: '%'
                },
                {
                  label: '缩放',
                  name: 'iconZoom',
                  max: 32,
                  min: 0,
                  unit: 'px'
                },
                {
                  label: '间距',
                  name: 'iconSpacing',
                  max: 64,
                  min: 0,
                  unit: 'px'
                }
              ]}
            />
          </Grid>
          <Grid item xs={6} className="flex content-center">
            <FormSlider
              legend="面板设置"
              item={[
                {
                  label: '不透明度',
                  name: 'panelOpacity',
                  max: 100,
                  min: 0,
                  unit: '%'
                }
              ]}
            />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={tabIndex} index={3} className={styles.root}>
        Item Three
      </TabPanel>
    </div>
  );
}
