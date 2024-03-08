import {useContext} from "react";
import {globalContext} from "src/GlobalContext";
import {getUsersColumns} from "src/logic/usersTable/usersColumns";
import {UsersTable} from "src/logic/usersTable/UsersTable";
import {UserPreview} from "src/model/businessModelPreview/UserPreview";

/**
 * Users table props
 */
interface UsersTableProps {

  /**
   * Users
   */
  users: UserPreview[];
}

/**
 * Render table of all Users
 */
export const UsersTableBlock = (props: UsersTableProps) => {
  const {language} = useContext(globalContext);

  return (
    <>
      <UsersTable
        data={props.users}
        columns={getUsersColumns(language)}
      />
    </>
  );
};
