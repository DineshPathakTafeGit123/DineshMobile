import * as React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RoiDeletePerson, RoiGetPerson } from '../utils/RoiApi';
import { PopupOk, PopupOkCancel } from '../utils/Popup';
import { TextParagraph, TextH1, TextLabel } from '../components/StyledText';
import Styles from '../styles/MainStyle';
import { MyButton } from '../components/MyButton';

export default function ViewPersonScreen(props) {
  const personTemplate = {
    id: 0,
    name: '',
    phone: '',
    departmentId: null,
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    department: null,
  };

  const [person, setPerson] = React.useState(personTemplate);

  React.useEffect(refreshPerson, []);

  function refreshPerson() {
    const id = props.route.params.id;

    RoiGetPerson(id)
      .then((data) => {
        if (data) setPerson(data);
      })
      .catch((error) => {
        PopupOk('API Error', 'Could not get person from the server');
        props.navigation.navigate('ViewPeople');
      });
  }

  function showEditPerson() {
    props.navigation.navigate('EditPerson', { id: person.id });
  }

  function deletePerson() {
    PopupOkCancel(
      'Delete person?',
      `Are you sure you want to delete ${person.name}`,
      () => {
        RoiDeletePerson(person.id)
          .then((data) => {
            PopupOk('Person deleted', `${person.name} has been deleted`);
            props.navigation.replace('Root', { screen: 'People' });
          })
          .catch((error) => {
            PopupOk('API Error', 'Could not delete person');
          });
      },
      () => {
        console.log('Cancel - no delete for you!');
      }
    );
  }

  return (
    <SafeAreaView style={Styles.safeAreaView}>
      <ScrollView style={Styles.container} contentContainerStyle={Styles.contentContainer}>
        <TextH1 style={{ marginTop: 0 }}>Person: {person.name}</TextH1>

        <View style={Styles.form}>
          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Details</TextParagraph>
            <View style={Styles.formRow}>
              <TextLabel>Employee ID:</TextLabel>
              <TextParagraph>{person.id}</TextParagraph>
            </View>
            <View style={Styles.formRow}>
              <TextLabel>Department:</TextLabel>
              <TextParagraph>{person.department ? person.department.name : '---'}</TextParagraph>
            </View>
            <View style={Styles.formRow}>
              <TextLabel>Phone:</TextLabel>
              <TextParagraph>{person.phone ? person.phone : '---'}</TextParagraph>
            </View>
          </View>

          <View style={Styles.fieldSet}>
            <TextParagraph style={Styles.legend}>Address</TextParagraph>
            <View style={Styles.formRow}>
              <TextLabel>Street:</TextLabel>
              <TextParagraph>{person.street}</TextParagraph>
            </View>

            <View style={Styles.formRow}>
              <TextLabel>City:</TextLabel>
              <TextParagraph>{person.city}</TextParagraph>
            </View>
            <View style={Styles.formRow}>
              <TextLabel>State:</TextLabel>
              <TextParagraph>{person.state}</TextParagraph>
            </View>
            <View style={Styles.formRow}>
              <TextLabel>Zip:</TextLabel>
              <TextParagraph>{person.zip}</TextParagraph>
            </View>
            <View style={Styles.formRow}>
              <TextLabel>Country:</TextLabel>
              <TextParagraph>{person.country}</TextParagraph>
            </View>
            
          </View>
        </View>

        <View style={[Styles.personButtonContainer, { borderBottomWidth: 0 }]}>
          <MyButton
            text="Edit"
            type="major"
            size="medium"
            onPress={showEditPerson}
          />
          <MyButton
            text="Delete"
            type="default"
            size="medium"
            onPress={deletePerson}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
