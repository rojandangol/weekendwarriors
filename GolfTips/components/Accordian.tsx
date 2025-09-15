// AccordionSection.tsx
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';


// Accordion used for expandable boxes  within' `About` section
interface AccordionSectionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionSectionProps> = ({ title, children }) => {
  return (
    <List.Section>
      <List.Accordion
        title={title}
        titleStyle={{ fontWeight: 'bold' }}
        style={styles.accordion}
      >
        <View style={styles.content}>
          {children}
        </View>
      </List.Accordion>
    </List.Section>
  );
};

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: 'transparent',
  },
  content: {
    padding: 10,
  },
});

export default Accordion;