import {useEffect, useState} from "react";
import {Heading} from "@radix-ui/themes";
import clsx from "clsx";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/title/Title.module.scss";

/**
 * Enum representing HTML heading levels.
 */
export enum HeadingLevel {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

/**
 * Title props
 */
interface TitleProps {

  /**
   * Heading level
   */
  level: HeadingLevel;

  /**
   * Additional custom class name for the component
   */
  classNameHeading?: string;

  /**
   * Additional custom class name for the component wrapper
   */
  className?: string;

  /**
   * Title
   */
  text: string;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish?: (value: string) => void;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default false
   */
  isEditable?: boolean;

  /**
   * Looks like it used only for logo. If logo does not use Title anymore, we can remove it
   */
  onClick?: () => void;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * Showed if value is an empty string
   */
  placeholder: string;
}

/**
 * Render Input or heading depend on client actions
 */
export const Title = (props: TitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState<string>(props.text);

  useEffect(() => {
    setText(props.text);
  }, [props.text]);

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    if (!props.onChangeFinish) {
      throw Error("Unavailable edit title");
    }
    props.onChangeFinish(text);
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      handleChangeFinish();
    }
  };

  return (
    <div
      onDoubleClick={() => {
        props.isEditable && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
      data-cy={props.dataCy}
    >
      {isEditing
        ? (
          <Input
            type="text"
            value={text}
            autoFocus={true}
            onChange={setText}
          />
        )
        : (
          <Heading
            onClick={props.onClick}
            as={props.level}
            className={clsx(props.classNameHeading)}
          >
            {text === "" ? props.placeholder : text}
          </Heading>
        )
      }
    </div>
  );
};
