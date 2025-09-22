
import { useAuthHook } from '@/providers/authContext';
import { Action, Resource, Role, userCan } from './aceess-rules';


const useAccessControl = () => {
  const { user } = useAuthHook();

  const isAllowed = (action: Action, target: Resource): boolean => {

    if (target == Resource.Auth) {
      return true
    }
    if (!user) {
      return false;
    }


    const userRoles = user.role

    return userCan([userRoles as Role], action, target)
  };

  const getResourceByUrl = (url: string): Resource => {
    const resources = Object.entries(Resource);

    for (const [key, value] of resources) {
      console.debug(key)
      if (url.startsWith("/" + value))
        return value
    };

    return Resource.Undefined
  }


  return { isAllowed, getResourceByUrl };
};




export default useAccessControl;
