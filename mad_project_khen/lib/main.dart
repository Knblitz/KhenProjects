import 'package:flutter/material.dart';

/**
 * The main entry point of the application.
 */
void main() {
  runApp(const GPAApp());
}

/**
 * The root widget for the GPA Calculator application.
 */
class GPAApp extends StatelessWidget {
  const GPAApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(home: GPA(), debugShowCheckedModeBanner: false);
  }
}

/**
 * A data model to represent a grade with a label and a numerical value.
 */
class Grade {
  final String label;
  final double value;
  Grade(this.label, this.value);
}

/**
 * A data model to represent credit hours with a label and a numerical value.
 */
class Credit {
  final String label;
  final double value;
  Credit(this.label, this.value);
}

/**
 * A data model to represent a single academic module with its title, credit, and grade.
 */
class Module {
  String title;
  double credit;
  double grade;
  Module(this.title, this.credit, this.grade);
}

/**
 * The main stateful widget for the GPA calculator UI.
 */
class GPA extends StatefulWidget {
  const GPA({super.key});

  @override
  State<GPA> createState() => _GPAState();
}

/**
 * The State class for the GPA widget, managing the application's logic and UI state.
 */
class _GPAState extends State<GPA> {
  // Controller for the module name text field.
  final TextEditingController _moduleController = TextEditingController();
  // List to hold all the added modules.
  final List<Module> _modules = [];

  // The calculated GPA value.
  double _gpa = 0.0;

  // Predefined list of grades and their point values.
  final List<Grade> _grades = [
    Grade("A (4 Points)", 4.0),
    Grade("B (3 Points)", 3.0),
    Grade("C (2 Points)", 2.0),
    Grade("D (1 Point)", 1.0),
    Grade("E (1 Point)", 1.0),
    Grade("F (0 Point)", 0.0),
  ];

  // Predefined list of credit hours.
  final List<Credit> _credits = [
    Credit("1 Credit", 1),
    Credit("2 Credits", 2),
    Credit("3 Credits", 3),
    Credit("4 Credits", 4),
    Credit("5 Credits", 5),
    Credit("6 Credits", 6),
    Credit("7 Credits", 7),
    Credit("8 Credits", 8),
  ];

  // Selected grade and credit from the dropdowns.
  Grade? _selectedGrade;
  Credit? _selectedCredit;
  // Index of the module being edited, if any.
  int? _editingIndex;

  /* Adds a new module or updates an existing one based on the current state.*/
  void _addOrUpdateModule() {
    // Return if any required field is empty.
    if (_moduleController.text.isEmpty ||
        _selectedCredit == null ||
        _selectedGrade == null) {
      return;
    }

    setState(() {
      final module = Module(
        _moduleController.text,
        _selectedCredit!.value,
        _selectedGrade!.value,
      );

      // Check if we are in an editing state or adding a new module.
      if (_editingIndex != null) {
        _modules[_editingIndex!] = module;
        _editingIndex = null; // Exit editing mode.
      } else {
        _modules.add(module);
      }

      // Clear the input fields after adding or updating.
      _moduleController.clear();
      _selectedCredit = null;
      _selectedGrade = null;

      _calculateGPA();
    });
  }

  /**
   * Calculates the GPA based on the list of modules.
   * Uses a weighted average formula: (Sum of (credit * grade)) / (Sum of credits).
   */
  void _calculateGPA() {
    double totalCredits = 0;
    double totalPoints = 0;

    for (var module in _modules) {
      totalCredits += module.credit;
      totalPoints += module.credit * module.grade;
    }

    // Prevents division by zero.
    _gpa = totalCredits == 0 ? 0 : totalPoints / totalCredits;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // App bar with the title.
      appBar: AppBar(
        title: const Text("GPA Calculator"),
        backgroundColor: Colors.lightBlueAccent,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(12.0),
        child: Column(
          children: [
            // Text field for module name.
            TextField(
              controller: _moduleController,
              decoration: const InputDecoration(
                labelText: "Module Name",
                border: OutlineInputBorder(),
                prefixIcon: Icon(Icons.list),
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                // Dropdown for selecting credits.
                Expanded(
                  child: DropdownButtonFormField<Credit>(
                    value: _selectedCredit,
                    hint: const Text("Select Credit"),
                    items: _credits.map((credit) {
                      return DropdownMenuItem(
                        value: credit,
                        child: Text(credit.label),
                      );
                    }).toList(),
                    onChanged: (val) {
                      setState(() {
                        _selectedCredit = val;
                      });
                    },
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.credit_card),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                // Dropdown for selecting grades.
                Expanded(
                  child: DropdownButtonFormField<Grade>(
                    value: _selectedGrade,
                    hint: const Text("Select Grade"),
                    items: _grades.map((grade) {
                      return DropdownMenuItem(
                        value: grade,
                        child: Text(grade.label),
                      );
                    }).toList(),
                    onChanged: (val) {
                      setState(() {
                        _selectedGrade = val;
                      });
                    },
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                      prefixIcon: Icon(Icons.grade),
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            // Button to add or update a module.
            ElevatedButton(
              onPressed: _addOrUpdateModule,
              child: Text(
                _editingIndex == null ? "Add Module" : "Update Module",
              ),
            ),
            const Divider(thickness: 2, color: Colors.red),
            // Text displaying the calculated GPA.
            Text(
              _modules.isEmpty
                  ? "Add modules to calculate GPA"
                  : "Your GPA is ${_gpa.toStringAsFixed(2)}",
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.amber,
              ),
            ),
            const SizedBox(height: 12),
            // List view to display all modules.
            Expanded(
              child: ListView.builder(
                itemCount: _modules.length,
                itemBuilder: (context, index) {
                  final module = _modules[index];
                  return Card(
                    child: ListTile(
                      title: Text(module.title),
                      subtitle: Text(
                        "Credit: ${module.credit}, Grade: ${module.grade}",
                      ),
                      // Row containing edit and delete icons.
                      trailing: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          // Edit icon button.
                          IconButton(
                            icon: const Icon(Icons.edit),
                            onPressed: () {
                              setState(() {
                                _editingIndex = index;
                                _moduleController.text = module.title;
                                _selectedCredit = _credits.firstWhere(
                                  (c) => c.value == module.credit,
                                );
                                _selectedGrade = _grades.firstWhere(
                                  (g) => g.value == module.grade,
                                );
                              });
                            },
                          ),
                          // Delete icon button.
                          IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              setState(() {
                                _modules.removeAt(index);
                                _calculateGPA();
                              });
                            },
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
