import { useParams } from 'react-router-dom';
import AcademicResourcePage from './AcademicResourcePage';

export default function ProgrammeOutcomes() {
  const { stream } = useParams();
  const subcategory = stream ? stream.toLowerCase() : undefined;

  return (
    <AcademicResourcePage
      category="programme-outcomes"
      subcategory={subcategory}
      title={`Programme Outcomes — ${stream ? stream.toUpperCase() : ''}`}
      description="Course-wise programme outcomes and learning objectives"
    />
  );
}