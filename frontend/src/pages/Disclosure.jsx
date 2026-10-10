import { FaFilePdf } from 'react-icons/fa';

export default function Disclosure() {
  const docs = [
    { name: 'Affiliation Letter from Panjab University,Chandigarh', url: '#' },
    { name: 'NCTE Approval Letter', url: '#' },
    { name: 'UGC 2(f) & 12(B) Recognition', url: '#' },
    { name: 'Building Safety Certificate (PWD)', url: '#' },
    { name: 'Fire Safety Certificate / NOC', url: '#' },
    { name: 'Approved Staff List with Qualifications', url: '#' },
    { name: 'Approved Fee Structure Document', url: '#' },
    { name: 'Land Use Certificate / Ownership Deed', url: '#' },
    { name: 'NAAC Accreditation Certificate', url: '#' },
  ];

  return (
    <div>
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-2">Mandatory Public Disclosure</h1>
          <p className="text-gray-200">As per UGC / NCTE / AICTE norms</p>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="p-4 text-left">Sr. No.</th>
                <th className="p-4 text-left">Document / Information</th>
                <th className="p-4 text-center">Download</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4">{d.name}</td>
                  <td className="p-4 text-center">
                    <a
                      href={d.url}
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold"
                    >
                      <FaFilePdf /> View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}