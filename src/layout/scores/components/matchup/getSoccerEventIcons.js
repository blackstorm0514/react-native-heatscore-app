import CornerIcon from '../../../../assets/images/eventicons/soccer-corner.png';
import YellowCardIcon from '../../../../assets/images/eventicons/soccer-yellowcard.png';
import RedCardIcon from '../../../../assets/images/eventicons/soccer-redcard.png';
import OffsideIcon from '../../../../assets/images/eventicons/soccer-offside.png';
import GoalIcon from '../../../../assets/images/eventicons/soccer-goal.png';
import SubstitutionIcon from '../../../../assets/images/eventicons/soccer-substitution.png';

export const getSoccerEventIcons = (text) => {
    text = text.toLowerCase();
    if (text.search('corner') != -1) {
        return CornerIcon;
    }
    if (text.search('yellow card') != -1) {
        return YellowCardIcon;
    }
    if (text.search('red card') != -1) {
        return RedCardIcon;
    }
    if (text.search('offside') != -1) {
        return OffsideIcon;
    }
    if (text.search('goal') != -1) {
        return GoalIcon;
    }
    if (text.search('substitution') != -1) {
        return SubstitutionIcon;
    }
    return null;
}
